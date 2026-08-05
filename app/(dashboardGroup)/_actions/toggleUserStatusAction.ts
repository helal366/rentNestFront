"use server"
import { IUserStatusResponse, UserStatus } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function toggleUserStatusAction(
  id: string,
  userStatus: UserStatus,
): Promise<IUserStatusResponse> {
  try {
    const baseUrl = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");
    if (!baseUrl) {
      throw new Error(
        "CRITICAL: BACKEND_VERCEL_URL environment variable is missing.",
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Not logged in...",
      };
    };
    let requiredStatus:UserStatus;
    if(userStatus==="BANNED"){
        requiredStatus="UNBAN"
    }else{
        requiredStatus="BANNED"
    }
    const payload = { userStatus: requiredStatus };
    const res = await fetch(`${baseUrl}/api/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result: IUserStatusResponse = await res.json();
    console.log({result})
    if (!res.ok || !result.success || !result.data) {
      return {
        success: false,
        statusCode: 400,
        message: result.message || "Failed to update user status.",
      };
    }
    revalidatePath("/users");
    return result
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Internal connection error. Please try again later.";
    }
    return {
      success: false,
      statusCode: 500,
      message,
    };
  }
}
