"use server";

import { cookies } from "next/headers";
import {
  RentalRequestAllItem,
  SingleRentalRequestResponse,
} from "../_types/rental_landlord_tenant_types";

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
}
const baseUrl = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");
if (!baseUrl) {
  throw new Error(
    "CRITICAL: BACKEND_VERCEL_URL environment variable is missing.",
  );
}
export async function authHeader() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("Credential invalid. Login required.");
    }
    return {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      }
}

export async function getAllRentalRequestsAction(): Promise<RentalRequestAllItem[]> {
     
  try {
    const res = await fetch(`${baseUrl}/api/rentals`, {
      method: "GET",
      headers: await authHeader(),
      next: { revalidate: 0 }, 
    });

    if (!res.ok) throw new Error("Failed to fetch rental requests");

    const result: ApiResponse<RentalRequestAllItem[]> = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error in getAllRentalRequestsAction:", error);
    return [];
  }
}

/**
 * Fetches a single detailed rental request by its ID
 */
export async function getRentalRequestByIdAction(id: string): Promise<SingleRentalRequestResponse | null> {
  try {
    const res = await fetch(`${baseUrl}/api/rentals/${id}`, {
      method: "GET",
      headers: await authHeader(),
      next: { revalidate: 0 },
    });

    if (!res.ok)
      throw new Error(`Failed to fetch rental request with ID: ${id}`);

    const result: ApiResponse<SingleRentalRequestResponse> = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error in getRentalRequestByIdAction:", error);
    return null;
  }
}
