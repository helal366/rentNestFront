// (authGroup)/_actions/loginActions.ts
"use server";

import { cookies } from "next/headers";
import { loginSchema } from "@/zod_schemas/login_schema";
import { LoginActionState } from "@/lib/types";



export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = formData.get("email");
  const password = formData.get("password");

  // 1. Validate fields locally using Zod
  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // 2. Hit your external Express API
    const response = await fetch(`${process.env.BACKEND_VERCEL_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Invalid email or password.",
      };
    }

    // 3. Extract tokens from backend cookies and set them in Next.js
    const cookieStore = await cookies();
    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookieStr) => {
        const [nameValue, ...rest] = cookieStr.split(";");
        const [name, value] = nameValue.split("=");
        
        cookieStore.set(name.trim(), value.trim(), {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      });
    }

    return {
      success: true,
      message: "Login successful.",
    };

  } catch (error) {
    console.error("Login submission error:", error);
    return {
      success: false,
      message: "An unexpected network error occurred.",
    };
  }
}
