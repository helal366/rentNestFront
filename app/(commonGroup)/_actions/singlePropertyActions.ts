"use server";

import { PropertyAPIResponse } from "../_types/singlePropertyTypes";

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

export async function fetchPropertyById(
  id: string,
): Promise<PropertyAPIResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/properties/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching property data:", error);
    return null;
  }
}
