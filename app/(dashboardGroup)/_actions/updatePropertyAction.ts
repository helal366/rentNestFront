"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdatePropertyFields } from "../_types/my_property_updata_landlord_types";

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");



export async function updatePropertyAction(
  propertyId: string,
  payload: UpdatePropertyFields,
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Authentication required. Please log in.",
    };
  }

  try {
    const res = await fetch(
      `${BASE_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to modify property metrics.",
      };
    }

    // Purge regional view models caches immediately
    revalidatePath(`/my_properties_landlord`);
    revalidatePath(`/my_properties_landlord/${propertyId}`);

    return {
      success: true,
      message: result.message || "Property listing updated successfully!",
    };
  } catch (error) {
    console.error("Update execution boundary error:", error);
    return {
      success: false,
      message: "Network configuration protocol fault. Please try again.",
    };
  }
}
