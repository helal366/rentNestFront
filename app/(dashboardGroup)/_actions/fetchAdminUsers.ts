"use server";

import { cookies } from "next/headers";
import { BackendResponse } from "../_types/users_types";

export async function fetchAdminUsers(): Promise<BackendResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
     if (!accessToken) {
       return {
         success: false,
         statusCode: 400,
         message: "Not logged in...",
         data: {
           meta: { totalUsers: 0 },
           users: [],
         },
       };
     }
    const baseUrl = process.env.BACKEND_VERCEL_URL
    const response = await fetch(`${baseUrl}/api/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`, 
      },
      cache: "no-store", 
    });

    if (!response.ok) {
      throw new Error(`Server returned status code: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message:
        error instanceof Error
          ? error.message
          : "Failed to load users profile data.",
      data: {
        meta: { totalUsers: 0 },
        users: [],
      },
    };
  }
}
