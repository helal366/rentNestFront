"use server";

import { PropertiesResponse } from "./homeActions"; // Reusing your existing types

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

export async function fetchRecentlyAddedProperties(
  limit = 3,
): Promise<PropertiesResponse | null> {
  try {
    // Queries the endpoint with a smaller limit to display a clean single row banner
    const res = await fetch(`${BASE_URL}/api/properties?limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching recently added listings:", error);
    return null;
  }
}
