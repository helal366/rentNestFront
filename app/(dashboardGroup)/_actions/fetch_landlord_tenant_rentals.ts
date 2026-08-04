"use server";

import { cookies } from "next/headers";
import {
  PaymentGatewayResponse,
  RentalRequestAllItem,
  SingleRentalRequestResponse,
} from "../_types/rental_landlord_tenant_types";
import { RentRequestStatus } from "@/lib/types";

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


// update rental request action by landlord
export async function updateRentalRequestStatusAction(
  id: string,
  requestStatus: RentRequestStatus
): Promise<{ success: boolean; message: string }> {
  try {
    const headers = await authHeader();

    const res = await fetch(`${baseUrl}/api/landlord/requests/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ requestStatus }),
      next: { revalidate: 0 },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update request status");
    }

    return {
      success: true,
      message: result.message || "Status updated successfully",
    };
  } catch (error) {
    if(error instanceof Error){
      console.error(error.message);
    }else{
      console.error("Error in updateRentalRequestStatusAction:");
    }
    return {
      success: false,
      message: `${error instanceof Error ? error.message : "An unexpected error occurred"}`
    };
  }
}


// PAYMENT FOR TENANT AFTER LANDLORD APPROVAL
/**
 * Initiates an SSLCommerz payment gateway session for a given rental request
 * Accessible exclusively by the authenticated TENANT
 */
export async function createPaymentGatewayAction(
  rentalRequestId: string
): Promise<{ success: boolean; data?: PaymentGatewayResponse; message: string }> {
  try {
    const baseUrl = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");
    const headers = await authHeader();

    const res = await fetch(`${baseUrl}/api/payments/create`, {
      method: "POST",
      headers,
      body: JSON.stringify({ rentalRequestId }),
      next: { revalidate: 0 },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to generate checkout link.");
    }

    return { 
      success: true, 
      data: result.data, 
      message: result.message || "Gateway initialized." 
    };
  } catch (error) {
     if (error instanceof Error) {
       console.error(error.message);
     } else {
       console.error("Error in createPaymentGatewayAction.");
     }
    return {
      success: false,
      message: `${error instanceof Error ? error.message : "An unexpected error occurred during checkout setup."}`,
    };
  }
}
