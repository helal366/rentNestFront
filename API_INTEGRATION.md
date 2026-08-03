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

### `PropertyDetailPage` (`app/properties/[id]/page.tsx`)

* **Backend Endpoint:** `GET ${process.env.BACKEND_VERCEL_URL}/api/properties/:id` *(currently using mock data)*
* **Route Param:**

  ```json
  {
    "id": "string"
  }
  ```
* **Description:**

  * Fetches a single property using dynamic route `id`
  * Currently uses local mock data (`properties_demodata.json`)
  * Finds property by matching `property.id === params.id`
  * Handles:

    * Invalid ID → `notFound()` (Next.js 404 page)
  * Displays:

    * Property category & rent status
    * Location, area, rent price
    * Amenities list
    * Rental request activity log
    * Landlord details (name, email, contact)
    * Approved tenant (if exists)
  * Navigation:

    * Back button → `/properties`

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
