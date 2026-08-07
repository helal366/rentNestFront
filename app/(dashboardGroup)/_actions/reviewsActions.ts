"use server";

import { cookies } from "next/headers";
import { IGetReviewsResponse, } from "../_types/reviews_types";

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");

export const getAllReviews = async (): Promise<IGetReviewsResponse> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Not logged in",
      data: { reviews: [] },
    };
  }

  const res = await fetch(`${BASE_URL}/api/reviews`, {
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
        result.message || "Failed to create review via backend application.",
      data: {
        reviews: [], // ✅ MUST include this
      },
    };
  }
  return result;
};
