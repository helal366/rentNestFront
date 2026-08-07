"use server";

import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";
import {
  IRentalRequestsResponse,
//   CreateReviewActionResponse,
} from "../_types/create_review_tenant_types";

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

/**
 * 1. Read Action: Fetches all paid rental records for the authenticated tenant
 */
export async function getPaidRentalRequests(): Promise<IRentalRequestsResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Not logged in...",
        data: [],
      };
    }

    const response = await fetch(`${BASE_URL}/api/rentals/isPaid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store"
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        statusCode: response.status || 400,
        message: result.message || "Failed to fetch rental records.",
        data: [],
      };
    }

    return {
      success: true,
      statusCode: 200,
      message:
        result.message || "Tenant rental requests retrieved successfully.",
      data: result.data,
    };
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Internal connection error. Please try again later.",
      data: [],
    };
  }
}

/**
 * 2. Mutation Action: Submits a new tenant review directly to the backend
 */
// export async function createReviewAction(
//   payload: any, // Accepts direct review inputs without strict zod structures
// ): Promise<CreateReviewActionResponse> {
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;

//     if (!accessToken) {
//       return {
//         success: false,
//         statusCode: 401,
//         message: "Not logged in...",
//       };
//     }

//     const response = await fetch(`${BASE_URL}/api/reviews`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `accessToken=${accessToken}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();

//     if (!response.ok || !result.success) {
//       return {
//         success: false,
//         statusCode: response.status || 400,
//         message:
//           result.message || "Failed to create review via backend application.",
//       };
//     }

//     // Refresh layout views data cache pools
//     revalidatePath("/create_review_tenant");
//     revalidatePath("/reviews");

//     return {
//       success: true,
//       statusCode: 200,
//       message: "Review submitted successfully!",
//       data: result.data,
//     };
//   } catch {
//     return {
//       success: false,
//       statusCode: 500,
//       message: "Internal connection error. Please try again later.",
//     };
//   }
// }
