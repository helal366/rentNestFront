"use server";

import { cookies } from "next/headers";
import {
  IRentalResponse,
  ICreateReviewPayload,
  IReviewResponse,
} from "../_types/leave_review_types";

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

// ✅ Get Rental → extract propertyId
export const getRentalById = async (
  rentalId: string,
): Promise<IRentalResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Rental request fetch failed.",
      statusCode: 401,
    };
  }

  const res = await fetch(`${BASE_URL}/api/rentals/${rentalId}`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  });

  const result = await res.json();
  if (!res.ok || !result.success) {
    return {
      success: false,
      statusCode: 400,
      message:
        result.message || "Failed to retrieved rental request via backend application.",
    };
  }

  return result;
};

// ✅ Create Review
export const createReview = async (
  payload: ICreateReviewPayload,
): Promise<IReviewResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Not logged in",
    };
  }

  const res = await fetch(`${BASE_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok || !result.success) {
    return {
      success: false,
      statusCode: 400,
      message:
        result.message || "Failed to create review via backend application.",
    };
  }

  return result;
};
