# API Integration Mapping

This document maps the frontend components to their respective backend API endpoints.

## Auth Components

- **`LoginForm.jsx`**
  - `POST /api/auth/login` - Authenticates user credentials and returns a JWT token.
- **`RegisterForm.jsx`**
  - `POST /api/auth/register` - Creates a new user account.

## Authentication Context

### `LoginPage` (`LoginForm.tsx` & `loginActions.ts`)

- **Backend Endpoint:** `POST ${process.env.BACKEND_VERCEL_URL}/api/auth/login`
- **Payload Interface:** `LoginInput` (Validated server-side via Zod schema)
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Cookie Management Pipeline:** On a successful backend response (`data.success`), the Next.js server sets two HTTP-only secure state cookies:
  - `accessToken` (maxAge: 24h, HttpOnly, SameSite: Strict)
  - `refreshToken` (maxAge: 24h, HttpOnly, SameSite: Strict)
- **Dynamic Post-Auth Gateways:** Decodes the received JWT `accessToken` payload on the server using `jsonwebtoken` to determine authorization privileges and trigger immediate routing:
  - Role: `TENANT` -> Redirects to `/tenant_dashboard`
  - Role: `LANDLORD` -> Redirects to `/landlord_dashboard`
  - Role: `ADMIN` -> Redirects to `/admin_dashboard`
  - Fallback -> Redirects to `/`

### `RegisterPage` (`RegisterForm.tsx` & `registerAction.ts`)

- **Backend Endpoint:** `POST ${process.env.BACKEND_VERCEL_URL}/api/auth/register`
- **Payload Interface:** `RegisterInput` (Validated server-side via Zod v4 schema)
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "confirmPassword": "securePassword123",
    "role": "TENANT",
    "address": "123 Main Street",
    "contactNo": "01712345678"
  }
  ```
- **Validation Layer:** Enforces an absolute 11-digit mobile requirement starting exclusively with `01` or `09` regex sequences, and mirrors password criteria constraints.
- **Error Handling Pipeline:** Directly passes backend operational exceptions (e.g., duplicate email `prisma` conflicts) as the visible user message via Next.js `useActionState`.
- **Post-Registration Flow:** On a successful `200 OK` transaction status, it triggers a server-side route redirect directly to the `/login` path.

# Properties Components

## Properties Pages

### `PropertiesPage` (`app/properties/page.tsx`)

- **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/properties`
- **Query Params (Validated via Zod):**

  ```json
  {
    "location": "string",
    "rentStatus": "AVAILABLE | NOT_AVAILABLE",
    "category": "string",
    "minPrice": "number",
    "maxPrice": "number",
    "amenities": ["string"],
    "page": "number"
  }
  ```

- **Description:**
  - Fetches properties using server-side rendering (SSR)
  - Validates query params using `frontendPropertySearchSchema`
  - Builds query string dynamically
  - Default fallback: `page = 1`
  - Passes query to `PropertiesList`

---

### `PropertiesList` (`PropertiesList.tsx`)

- **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/properties`
- **Description:**
  - Calls `fetchProperties(queryString)`
  - Displays:
    - Property cards
    - Amenities (highlighted if matched)
    - Price, location, category

  - Handles:
    - Empty state (no results)
    - Error state (API failure)

  - Pagination:
    - Uses `meta.page` & `meta.totalPages`
    - Preserves filters via query params
    - Routes:
      - Previous → `page - 1`
      - Next → `page + 1`

  - Property details navigation:
    - `/properties/:id`

---

### `PropertyFilters` (`PropertyFilters.tsx`)

- **Backend Endpoint:** `GET /api/properties` (via query params)
- **Action Handler:** `handleFilterSubmit` (Server Action)
- **Description:**
  - Client-side filter UI
  - Controls:
    - Location (Select)
    - Rent Status (Select)
    - Category (Select)
    - Price Range (min/max)
    - Amenities (multi-select checkbox)

  - Submission Flow:
    - Form → Server Action → URL अपडेट → Page reload (SSR)

  - State Handling:
    - `useTransition` for smooth updates
    - Controlled state: `minPrice`, `amenities`

  - Reset:
    - Redirects to `/properties`

---

### `fetchProperties` (Utility Function)

- **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/properties`
- **Description:**
  - Uses `fetch` with:
    - `cache: "no-store"`
    - `AbortSignal.timeout(12000)`

  - Handles:
    - Network errors
    - Backend validation errors

  - Returns:

        * `{

    success: boolean;
    message: string;
    statusCode: number;
    data: {
    meta: {
    id: string;
    propertyCategoryId: string;
    rentStatus: RentStatus;
    landlordId: string;
    approvedTenantId: string | null;
    rentPrice: number;
    location: PropertyLocation;
    areaInSqFt: number;
    amenities?: PropertyAmenity[];
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    category: getAllPropertiesCategory;
    propertyRentRequests: getAllPropertiesRentRequest[];
    approvedTenant: getAllPropertiesProfileSummary | null;
    landlord: getAllPropertiesProfileSummary;
    };
    properties: getAllPropertiesItem[];
    };
    } | null`


    ## Property Details Page

### `PropertyDetailsPage` (`app/properties/[id]/page.tsx`)

- **Backend Endpoints:** 
  - `GET ${process.env.BACKEND_VERCEL_URL}/api/properties/:id` (Public details retrieval)
  - `GET ${process.env.BACKEND_VERCEL_URL}/api/auth/me` (Internal authenticated user session check)
- **Dynamic Route Params:**
  - `id`: `string` (UUID matching a specific property record)

- **Description:**
  - Fetches individual property information along with authentication contexts concurrently using server-side fetching via `Promise.all`.
  - Enforces route failure boundaries using Next.js `notFound()` if data validation loops fail or backend responses return invalid structures.
  - Dynamically passes authorization status, authenticated user role scopes, and contextual datasets down into sub-nested UI elements.

---

### `ActiveRentalRequests` (`ActiveRentalRequests.tsx`)

- **Backend Data Dependency:** Extracted from the `propertyRentRequests` embedded relation array.
- **Access Rule Constraints:**
  - **Unauthenticated Users:** Completely hidden from layout views (returns `null`).
  - **Authenticated Users:** Visible to logged-in accounts holding either **TENANT**, **LANDLORD**, or **ADMIN** roles.

- **Description:**
  - Displays a responsive dashboard list detailing all currently active leasing queues submitted on this property asset.
  - Uses color-coded Shadcn `Badge` visual indicators to map states for `requestStatus` (`PENDING`, `APPROVED`, `REJECTED`) and settlement status flags (`isPaid`).
  - Shows critical applicant data sheets including full legal names, validation email addresses, and contact numbers.

---

### `RentalRequestButton` (`RentalRequestButton.tsx`)

- **Interactive State Conditions:**
  - **User Not Logged In:** Triggers a destructive Shadcn toast validation notice and shifts routes natively to `/login`.
  - **User Logged In but Not a Tenant:** Blockades processing execution, rendering a validation error badge warning that actions require a **TENANT** profile scope.
  - **Property Already Rented:** Renders an unclickable, disabled gray scale layout variant labeled "Unavailable for Rent".
  - **User Authorized (Is Tenant):** Proceeds to interact with execution middleware layers to trigger future backend state manipulation requests.

- **Description:**
  - A client-side state handling button designed using Shadcn UI foundational layers.
  - Keeps workflows performant by handling client navigation routines and security constraints locally before invoking structural backend connection pipelines.

---

### `fetchPropertyById` (Utility Function)

- **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/properties/:id`
- **Description:**
  - Core network retrieval module executing native server-side `fetch` pipelines.
  - Utilizes standard `cache: "no-store"` header parameters to bypass browser request memory caching and guarantee real-time property updates.
  - Gracefully handles structural processing bugs or dead server gateways by trapping failures inside `try/catch` wrappers and returning clean recovery states (`null`).
- **Returns Type Structure:**

  ```typescript
  {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      property: {
        id: string;
        propertyCategoryId: string;
        rentStatus: RentStatus;
        landlordId: string;
        approvedTenantId: string | null;
        rentPrice: number;
        location: PropertyLocation;
        areaInSqFt: number;
        amenities: PropertyAmenity[];
        isDeleted: boolean;
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
        category: { name: string };
        propertyRentRequests: Array<{
          requestStatus: RentRequestStatus;
          isPaid: boolean;
          tenant: {
            name: string;
            email: string;
            contactNo: string;
            address: string;
            userStatus: UserStatus;
          };
        }>;
        approvedTenant: {
          name: string;
          email: string;
          contactNo: string;
          address: string;
          userStatus: UserStatus;
        } | null;
        landlord: {
          name: string;
          email: string;
          contactNo: string;
          address: string;
          userStatus: UserStatus;
        };
        propertyReviews: Array<{
          content: string;
          rating: number;
          tenant: { name: string; email: string };
        }>;
      };
    };
  } | null
  ```

### `createRentalRequestAction` (Server Action)

- **Backend Endpoint:** `POST ${process.env.BACKEND_VERCEL_URL}/api/rental-requests`
- **Data Payload Structure:** Direct injection of secure parameter keys derived from the backend data layer model:
  ```json
  {
    "propertyId": "string (UUID)",
    "landlordId": "string (UUID)"
  }
  ```
- **Description:**
  - Securely passes data payload inputs along with user session tracking `accessToken` cookies directly over to your Express backend framework.
  - Revalidates the page cache using Next.js `revalidatePath("/properties/:id")` upon a successful mutation loop response to refresh structural components immediately.


# My Profile Components

## Profile Page

### `MyProfile` (`app/my-profile/page.tsx`)

* **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/auth/me`

* **Description:**

  * Fetches authenticated user data using `getMe()` (SSR)
  * Returns full profile including:

    * Basic user info
    * Owned properties (if landlord)
    * Rental requests (if tenant)
    * Reviews
    * Approved rentals
  * Handles:

    * No data → displays `"No profile found"`
  * Passes data to `MyProfileJSX` component

---

# User Management Components

## Admin Users Directory Page

### `AdminUsersPage` (`app/(dashboardGroup)/users/page.tsx`)

* **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/admin/users`

* **Description:**
  * Fetches the global list of system users and analytical metrics using `fetchAdminUsers()` (SSR).
  * Passes cookies containing authorization credentials seamlessly from server-to-server.
  * Returns structured administrative database payloads containing:
    * **System Metadata (`meta`):** Global structural calculation parameters including total registered active system users count.
    * **User Core Schemas (`users`):** Extended profiles with relational models like nested Tenant Reviews, Landlord Properties, Active Rental Enquiries, Category strings, and Approval logs.
  * Handles:
    * **Session Validation Failure:** Catches missing tokens safely to output `"Not logged in..."` warnings.
    * **Database Exceptions:** Isolates error instances to print accurate runtime messages.
  * Passes data payload parameters straight down into the `UsersDashboardClient` layout.

---


# Admin Dashboard Components

## Rental Requests Administration

### `RentalRequestsAdminPage` (`app/(dashboardGroup)/admin_dashboard/rental_requests_admin/page.tsx`)

* **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/admin/rentals`

* **Description:**
  * Fetches all registered system transaction requests using `getRentalRequests()` (SSR)
  * Implements `export const dynamic = "force-dynamic"` to ensure secure, fresh server-side evaluation per request.
  * Structural response model aggregates deeply nested system telemetry data, including:
    * **Property Specifications:** Sizing dimensions (`areaInSqFt`), spatial configurations, and geolocation coordinates (`JATRABARI`).
    * **Ecosystem Taxonomy:** Assigned categories mapped through parent relational data queries.
    * **Ecosystem Counterparties:** Contact data for landowners and approved tenants (`name`, `email`, `contactNo`, `address`).
    * **Community Metrics:** Direct embedding of client satisfaction logs and quantitative feedback reviews (`rating`, `content`).
  
* **State & Edge-Case Handling:**
  * **Authorization Middleware:** Extracted user tokens (`accessToken`) verified against administrative roles (`Role.ADMIN`).
  * **Empty Payload Tracking:** Gracefully displays *"No system rental requests found"* state when the retrieved data dataset is completely empty (`0 records`).
  * **Dynamic Detail Modal:** Structural properties are parsed directly down to the client-facing `RentalDetailsModal` component to map granular layout specifics via isolated dialog popups.

# Category Management Components

## Categories Overview Page

### `CategoriesPage` (`app/categories/page.tsx`)

* **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/categories`

* **Description:**
  * Fetches the complete real estate category tree and listing details using Server-Side Rendering (SSR).
  * Enforces `cache: "no-store"` to prevent stale configurations and guarantee real-time property status updates.
  * Securely forwards authentication by reading the `accessToken` directly from client cookies and appending it to the outgoing fetch headers.

* **Payload Mapping:**
  * Accesses an atomic dataset generated via a backend Prisma transaction containing:
    * **`meta`**: Total count of active, non-soft-deleted categories.
    * **`categories`**: Dynamic list of category definitions, each embedding its related `properties` data and parent `landlord` account parameters.

* **Handles:**
  * **Missing Credentials:** Intercepts missing or expired session cookies gracefully by bypassing the server fetch and passing an empty baseline payload context to prevent client UI crashes.
  * **Missing Configuration:** Throws a structural runtime exception if the core `BACKEND_VERCEL_URL` environment variables are absent.

* **Data Pipeline:**
  * Hands off the verified categories collection directly into the visual layout wrapper: `AllCategoriesAdmin`

---


# Rental Requests & Landlord Operations Management

## 1. Rental Requests Overview Dashboard

### `RentalRequestsPage` (`app/(dashboardGroup)/rental_requests/page.tsx`)

* **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/rentals`
* **Description:**
  * Displays a comprehensive overview listing of all incoming or outgoing property leasing applications relative to the authenticated user's session profile.
  * Utilizes explicit server compilation pipelines embedding Next.js dynamic routing mechanics (`revalidate: 0`) to enforce strict freshness guarantees across multi-tenant states.
  * Asynchronously hooks into the browser storage registry to extract the active `accessToken` value, injecting it dynamically as a `Cookie` string key header.
* **Payload Mapping:**
  * Consumes a relational data matrix mapped via backend Prisma filters (`findMany`) optimized for dual-persona queries (`tenantId` or `landlordId` criteria):
    * **`rentalRequestProperty`**: Displays location geographical tags, total dimensions (`areaInSqFt`), structural feature matrices (`amenities`), and current lease availability states.
    * **`landlord`**: Surfaces fundamental profile identifiers including full names and linked primary email records.
* **Handles:**
  * **Unauthorized States:** Catches cookie parsing failure states or missing credentials securely inside a structural `try/catch` safety net, shifting the UI down into an explicit localized sign-in redirection card.
  * **Empty Query Sets:** Gracefully short-circuits to an alternate empty-state Shadcn visual card description text block when no matching historical items are found.
* **Data Pipeline:**
  * Collects the structural array payload map downstream to drive structural grid layouts populated directly via Tailwind CSS viewports.

---

## 2. Rental Request Details Page

### `RentalRequestDetailPage` (`app/(dashboardGroup)/rental_requests/[id]/page.tsx`)

* **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/rentals/:id`
* **Description:**
  * Generates an isolated, comprehensive dashboard overview tracking state rules, ledger tables, and user demographic data matching a unique parameter ID variable string.
  * Enforces robust server-side permission walls where request ownership profiles are validated at the API tier against individual tenant and landlord accounts.
* **Payload Mapping:**
  * Hydrates a multi-dimensional relational response object schema (`findUniqueOrThrow`) structured inside a single parent wrapper key (`data.rentalRequest`):
    * **`rentalRequestProperty`**: Aggregates month-to-month dynamic pricing data (`rentPrice`), category definitions, dimensions, and explicit property features.
    * **`tenant` / `landlord`**: Maps complete communication profiles including physical addresses, telephone listings, and restrictive system account states (`userStatus`).
    * **`payments`**: Streams an embedded linear list array detailing localized financial ledgers complete with provider metrics (`SSLCOMMERZ`), gateway methodologies, and absolute transactional timestamps.
* **Handles:**
  * **Missing / Corrupted Records:** Triggers a standard core Next.js structural `notFound()` redirection cascade if the lookup fails or returns null variables.
  * **State Lifecycle Integrity:** Passes parameters downstream into localized client control containers to track status mutations securely.
* **Data Pipeline:**
  * Unpacks and splits parent record fields across isolated structural visual fragments:
    * `PropertyInsightsCard` — Manages the physical structural real estate parameters.
    * `TransactionLedgerCard` — Hydrates financial accounting tables dynamically.
    * `UserProfileCard` — Controls layout formatting for individual participant profiles.
    * `LandlordActionPanel` — Mounts conditional interaction triggers for state modifications.

---

## 3. Landlord Status Modification Controller

### `LandlordActionPanel` (`app/(dashboardGroup)/_components/rentalLandlordTenant/LandlordActionPanel.tsx`)

* **Backend Endpoint:** `PATCH ${process.env.BACKEND_VERCEL_URL}/api/landlord/requests/:id`
* **Description:**
  * An interactive client-side management hub allowing landlords to step-mutate rental request states between strict lifecycle stages (`PENDING`, `APPROVED`, `REJECTED`).
  * Triggers database transactions that execute cascade updates across competing user applications and flip parent property flags (`rentStatus` transitions).
* **Payload Mapping:**
  * Submits an outbound body payload containing:
    * **`requestStatus`**: The uppercase targeted target state value enum (`PENDING` | `APPROVED` | `REJECTED`).
* **Handles:**
  * **Financial Lockouts:** UI safeguard components lock down mutation fields immediately if payment completion flags return positive (`isPaid: true`), mirroring backend error preventions against reverting finalized leases.
  * **Network Lifecycle Pending States:** Introduces localized layout states (`loadingStatus`) to disable simultaneous mouse events and swap base icons out for active loading spinners (`Loader2`) during flight.
  * **Optimistic Synchronizations:** Executes a hot global router instruction refresh (`router.refresh()`) instantly following successful execution loops to pull clean data layers without full-page reloads.


## 4. Tenant Payment Gateway Initialization

### `TenantPaymentPanel` (`app/(dashboardGroup)/_components/rentalLandlordTenant/TenantPaymentPanel.tsx`)

* **Backend Endpoint:** `POST ${process.env.BACKEND_VERCEL_URL}/api/payments/create`
* **Description:**
  * Handles the secure checkout tunnel initialization via SSLCommerz for verified applications.
  * Dynamically queries structural relationships, tracking critical entity dependencies (`value_a: rentalRequestId`, `value_b: tenantId`, `value_c: landlordId`) securely across automated external bank verification scripts.
* **Payload Mapping:**
  * Inbound Body JSON properties require:
    * **`rentalRequestId`**: String hash linking back to target properties.
  * Expected API Success Returns:
    * **`paymentUrl`**: Encrypted absolute gateway session URL enabling immediate window client redirections (`window.location.replace`).
    * **`transactionId`**: System-generated identifier string tracking financial records.
* **State Safeguard Mechanisms:**
  * **Status Enforcements:** Client container components remain entirely hidden from viewports unless `requestStatus === "APPROVED"`.
  * **Immutable System States:** Once completed (`isPaid: true`), the backend application layer flags are locked down entirely. This blocks landlords from rolling back properties to pending states or re-assigning availability parameters to competing applicants.

## Payment Confirmation Page

### `PaymentConfirmation` (`app/payment_confirmation/page.tsx`)

* **Incoming Gateway Redirect Endpoint:** `POST /api/payments/confirm` (Handled by Express Backend)

* **Description:**
  * Displays dynamic transaction results after a user completes, cancels, or fails an SSLCommerz gateway session.
  * Captures live gateway parameters via URL query strings forwarded by the backend controller.
  * Wrapped in a Next.js `<Suspense>` boundary to safely handle client-side parameter parsing during build-time rendering.

* **URL Parameter Mappings:**
  * `status`: Defines the view configuration (`success` | `cancelled` | `failed`).
  * `tranId`: The unique database transaction tracking string (`TXN-XXXXXXXX`).
  * `amount`: The dynamic financial currency value processed (e.g., `6000 BDT`).
  * `method`: The specific transaction platform used (e.g., `NAGAD-Nagad`, `BKASH-bKash`, `CARD`).
  * `date`: ISO timestamp marking when the transaction payload hit the system database.

* **Conditional Views Handled:**
  * **Success:** Shows an animated confirmation state, breaks down specific transaction fields, and offers options to view payment history or return home.
  * **Cancelled:** Displays an amber warning indicating the window was manually closed, confirming no funds were deducted, and adds a retry payment shortcut.
  * **Failed:** Renders a red error alert mapping failure conditions (insufficient funds, invalid verification) and guides the user to retry with another card.
