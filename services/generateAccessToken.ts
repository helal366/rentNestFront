import { cookies } from "next/headers"

export const generateAccessToken = async()=>{
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    // console.log({refreshToken})
    if(!refreshToken){
        return {
            success: false,
            statusCode: 400,
            message: "Not logged in..."
        }
    };
    // console.log(`${process.env.BACKEND_VERCEL_URL}`)
    const data = await fetch(`${process.env.BACKEND_VERCEL_URL}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
            Cookie: `refreshToken=${refreshToken}`
        },
        cache: "no-store"
    });
    if(!data.ok){
        return {
            success: false,
            statusCode: data.status,
            message: "Failed to refresh token"
        }
    }
   
    const result =await data.json();
   
    return result
}


 // if(data.ok){
    //  const backendCookie = data.headers.get("set-cookie");
    //  console.log({backendCookie});
    //  if(backendCookie){
    //     const match =backendCookie.match(/accessToken=([^;]+)/);
    //     if(match){
    //         console.log("match: ", match[1]);
    //         const cookieStore = await cookies();
    //         cookieStore.set("accessToken", match[1], {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV==="production",
    //             sameSite: "strict",
    //             maxAge: 60*60*24
    //         })
    //     }
    //  }
    // }