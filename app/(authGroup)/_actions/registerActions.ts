"use server";

import { registerSchema } from "@/zod_schemas/register_schema";
import { RegisterActionState, RegisterResponse } from "@/lib/types";
import { redirect } from "next/navigation";
import z from "zod";

export async function registerAction(
  prevState: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  let shouldRedirect = false;

  // 1. EXTRACT ALL FIELD VALUES FROM THE FORM DATA
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const role = formData.get("role");
  const address = formData.get("address");
  const contactNo = formData.get("contactNo");

  // 2. VALIDATE THE PAYLOAD AGAINST ZOD V4 SCHEMA
  const validatedFields = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
    role,
    address,
    contactNo,
  });

  // 3. RETURN ERRORS IMMEDIATELY IF VALIDATION FAILS
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      success: false,
      statusCode: 400,
      message: "Validation failed. Please correct the highlighted errors.",
      errors: flattened.fieldErrors,
    };
  }

  // 4. SEND CLEAN DATA PAYLOAD TO YOUR BACKEND API
  const response = await fetch(`${process.env.BACKEND_VERCEL_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  const data: RegisterResponse = await response.json();

  // 5. HANDLE INDIVIDUAL BACKEND FAILURES
  if (!response.ok || !data.success) {
    return {
      success: false,
      statusCode: data.statusCode || response.status || 400,
      message: data.message || "Registration failed. Account might already exist.",
    };
  }

  // 6. TOGGLE REDIRECT TRIGGER ON ABSOLUTE SUCCESS
  if (data.success) {
    shouldRedirect = true;
  }


  // 7. EXECUTE REDIRECT OUTSIDE OF TRY-CATCH (REQUIRED BY NEXT.JS)
  if (shouldRedirect) {
    redirect("/login");
  }

  return {
    success: true,
    statusCode: 200,
    message: "User registered successfully.",
  };
}
