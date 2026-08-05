"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createPropertyFormSchema, ICreatePropertyFormInput } from "@/zod_schemas/create_property_schema";
import { CreatePropertyActionResponse } from "../_types/create_property_landlord_types";

export async function createPropertyAction(
  payload: ICreatePropertyFormInput,
): Promise<CreatePropertyActionResponse> {
  const validatedFields = createPropertyFormSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      success: false,
      statusCode: 400,
      message: "Validation failed.",
      errors: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Not logged in...",
      };
    }

    const response = await fetch(`${BASE_URL}/api/landlord/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        statusCode: 400,
        message:
          result.message ||
          "Failed to create property via backend application.",
      };
    }

    // Purge cached client routers viewing listings
    revalidatePath("/create_property_landlord");

    return {
      success: true,
      statusCode: 200,
      message: "Property created successfully!",
      data: result.data,
    };
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Internal connection error. Please try again later.",
    };
  }
}
