"use server";

import {
  APIResponse,
  PaymentRecordAll,
  PaymentRecordSingle,
} from "@/app/(dashboardGroup)/_types/payments_types";
import { cookies } from "next/headers";


async function getAuthHeaders() {
     const cookieStore = await cookies();
     const accessToken = cookieStore.get("accessToken")?.value;
     if (!accessToken) {
       throw new Error("Credential invalid. Login required.")
     }
    return {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    };
}

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

export async function fetchAllPaymentsAction(): Promise<PaymentRecordAll[]> {  
  try {
    const res = await fetch(`${BASE_URL}/api/payments`, {
      method: "GET",
      headers: await getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch payments");
    const result: APIResponse<PaymentRecordAll[]> = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("fetchAllPaymentsAction Error:", error);
    return [];
  }
}

export async function fetchPaymentByIdAction(
  id: string,
): Promise<PaymentRecordSingle | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/payments/${id}`, {
      method: "GET",
      headers: await getAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Failed to fetch payment with id ${id}`);
    const result: APIResponse<PaymentRecordSingle> = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("fetchPaymentByIdAction Error:", error);
    return null;
  }
}
