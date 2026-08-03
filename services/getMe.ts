import { cookies } from "next/headers"

const BASE_URL = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");
export const getMe = async()=>{
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if(!accessToken){
        return{
            success: false,
            statusCode: 400,
            message: "Not logged in..."
        }
    }
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

     if (!res.ok) {
       return {
         success: false,
         statusCode: res.status,
         message: "Failed to fetch user session from backend server.",
       };
     }

    const result =await res.json();
    return result
}