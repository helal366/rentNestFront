# API Integration Mapping

This document maps the frontend components to their respective backend API endpoints.

## Auth Components
* **`LoginForm.jsx`**
  * `POST /api/v1/auth/login` - Authenticates user credentials and returns a JWT token.
* **`RegisterForm.jsx`**
  * `POST /api/v1/auth/register` - Creates a new user account.

## Authentication Context

### `LoginPage` (`LoginForm.tsx` & `loginActions.ts`)
* **Backend Endpoint:** `POST ${process.env.BACKEND_VERCEL_URL}/api/auth/login`
* **Payload Interface:** `LoginInput` (Validated server-side via Zod schema)
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
* **Cookie Management Pipeline:** On a successful backend response (`data.success`), the Next.js server sets two HTTP-only secure state cookies:
  * `accessToken` (maxAge: 24h, HttpOnly, SameSite: Strict)
  * `refreshToken` (maxAge: 24h, HttpOnly, SameSite: Strict)
* **Dynamic Post-Auth Gateways:** Decodes the received JWT `accessToken` payload on the server using `jsonwebtoken` to determine authorization privileges and trigger immediate routing:
  * Role: `TENANT` -> Redirects to `/tenant_dashboard`
  * Role: `LANDLORD` -> Redirects to `/landlord_dashboard`
  * Role: `ADMIN` -> Redirects to `/admin_dashboard`
  * Fallback -> Redirects to `/`


### `RegisterPage` (`RegisterForm.tsx` & `registerAction.ts`)
* **Backend Endpoint:** `POST ${process.env.BACKEND_VERCEL_URL}/api/auth/register`
* **Payload Interface:** `RegisterInput` (Validated server-side via Zod v4 schema)
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
* **Validation Layer:** Enforces an absolute 11-digit mobile requirement starting exclusively with `01` or `09` regex sequences, and mirrors password criteria constraints.
* **Error Handling Pipeline:** Directly passes backend operational exceptions (e.g., duplicate email `prisma` conflicts) as the visible user message via Next.js `useActionState`.
* **Post-Registration Flow:** On a successful `200 OK` transaction status, it triggers a server-side route redirect directly to the `/login` path.

