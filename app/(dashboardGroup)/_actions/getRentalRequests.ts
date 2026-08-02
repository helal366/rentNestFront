import { cookies } from "next/headers";
import { APIResponse, RentalRequest,  } from "../_types/rental_requests_types";

export async function getRentalRequests(): Promise<RentalRequest[]> {
  try {
    const baseUrl = process.env.BACKEND_VERCEL_URL || "http://localhost:5000";

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // Fixed route URL to match your server configuration
    const res = await fetch(`${baseUrl}/api/admin/rentals`, {
      cache: "no-store",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch rental requests data: ${res.status}`);
    }

    const json: APIResponse = await res.json();
    return json.data.data || [];
  } catch (error) {
    console.error("Error retrieving rental requests:", error);
    return [];
  }
}
