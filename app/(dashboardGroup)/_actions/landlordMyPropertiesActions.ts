"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

// 1. Fetch all properties belonging to the logged-in landlord
export async function fetchLandlordProperties() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return { success: false, data: [] };

  try {
    const res = await fetch(`${BASE_URL}/api/landlord/my_properties`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });
    if (!res.ok) return { success: false, data: [] };
    const result = await res.json();
    return { success: true, data: result.data?.properties || [] };
  } catch (error) {
    console.error("Error fetching landlord properties:", error);
    return { success: false, data: [] };
  }
}

// 2. Fetch a single property details record belonging to the landlord
export async function fetchLandlordPropertyById(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const res = await fetch(`${BASE_URL}/api/landlord/my_properties/${id}`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        success: false,
        statusCode: 400,
        message: "Fetch failed.",
      };
    };
    return await res.json();
  } catch (error) {
    console.error("Error fetching landlord property details:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error fetching failed.",
    };;
  }
}

// 3. Temporary Server Action shell for handling deletions
export async function deletePropertyAction(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken)
    return { success: false, statusCode: 400, message: "Authentication required." };

  try {
    // Awaiting your specific backend DELETE endpoint later
    const res = await fetch(`${BASE_URL}/api/landlord/properties/${id}`, {
      method: "DELETE",
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        success: false,
        statusCode: 400,
        message: "Fetch failed.",
      };
    }
    revalidatePath("/my_properties_landlord");
    return {
      success: true,
      statusCode: 200,
      message: "Property removed from database list cleanly.",
    };
  } catch{
    return {
      success: false,
      message: "Failed to execute database deletion matrix.",
    };
  }
}
