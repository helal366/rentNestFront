"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

export async function createRentalRequestAction(
  propertyId: string,
  landlordId: string,
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
    const res = await fetch(`${BASE_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ propertyId, landlordId }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to submit rental request.",
      };
    }

    // Refresh the single property page cache to update the Active Rental Requests UI list immediately
    revalidatePath(`/properties/${propertyId}`);

    return {
      success: true,
      message: result.message || "Rental request submitted successfully!",
    };
  } catch (error) {
    console.error("Rental request mutation error:", error);
    return {
      success: false,
      message: "Network error occurred. Please try again later.",
    };
  }
}
