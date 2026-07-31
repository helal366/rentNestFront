// (authGroup)/_actions/loginActions.ts
"use server";

import { cookies } from "next/headers";
import { loginSchema } from "@/zod_schemas/login_schema";
import { LoginActionState, LoginResponse } from "@/lib/types";
import z from "zod";
import jwt, { JwtPayload } from "jsonwebtoken"
import { redirect } from "next/navigation";



export async function loginAction(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState>{
   let redirectToPath: string | null = null;
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = loginSchema.safeParse({ email, password });
  console.log({validatedFields});
  console.log("validated fields json data: ", JSON.stringify(validatedFields.data))

 if (!validatedFields.success) {
  const flattened = z.flattenError(validatedFields.error);

  return {
    success: false,
    statusCode:400,
    message: "Validation failed.",
    errors: flattened.fieldErrors, 
  };
}

  try {
    const response = await fetch(`${process.env.BACKEND_VERCEL_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data:LoginResponse = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        statusCode: 400,
        message: data.message || "Invalid email or password.",
      };
    }

    if(data.success){
        const cookieStore = await cookies();
        cookieStore.set("accessToken", data.data.accessToken, {
            httpOnly: true,
            maxAge: 60*60*24,
            sameSite: "strict"
        })
        cookieStore.set("refreshToken", data.data.refreshToken, {
            httpOnly: true,
            maxAge: 60*60*24,
            sameSite: "strict"
        })
    }

    const decodedAccessToken = jwt.decode(data.data.accessToken) as JwtPayload;
    if (decodedAccessToken?.role === "TENANT") {
      redirectToPath = "/tenant_dashboard";
    } else if (decodedAccessToken?.role === "LANDLORD") {
      redirectToPath = "/landlord_dashboard";
    } else if (decodedAccessToken?.role === "ADMIN") {
      redirectToPath = "/admin_dashboard";
    } else {
      redirectToPath = "/"; 
    }
   

  } catch (error) {
    console.error("Login submission error:", error);
    return {
      success: false,
      statusCode: 400,
      message: "An unexpected network error occurred.",
    };
  }
 if (redirectToPath) {
    redirect(redirectToPath); 
  }
   return {
      success: true,
      statusCode: 200,
      message: "Login successful.",
    };
   
}
