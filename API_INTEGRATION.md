# API Integration Mapping

This document maps the frontend components to their respective backend API endpoints.

## Auth Components
* **`LoginForm.jsx`**
  * `POST /api/v1/auth/login` - Authenticates user credentials and returns a JWT token.
* **`RegisterForm.jsx`**
  * `POST /api/v1/auth/register` - Creates a new user account.
