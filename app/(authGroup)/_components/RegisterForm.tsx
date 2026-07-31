"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RegisterActionState } from "@/lib/types";
import { toast } from "sonner";
import { registerAction } from "../_actions/registerActions";

const initialState: RegisterActionState = {
  success: false,
  statusCode: 0,
  message: "",
  data: null
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  
  console.log({ state });
  console.log({ formAction });
  console.log({ isPending });
  
  useEffect(() => {
    if (!state || state.statusCode === 0) {
      return;
    }

    if (state.success) {
      toast.success(state.message || "Registration successful.");
    } else {
      toast.error(state.message || "Registration failed");
    }
  }, [state]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Join RentNest to find or list available properties</CardDescription>
      </CardHeader>
      
      <form action={formAction}>
        <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto px-6 py-2">
          {!state.success && state.message && !state.errors && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              disabled={isPending}
            />
            {state.errors?.name && (
              <p className="text-xs font-medium text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              disabled={isPending}
            />
            {state.errors?.email && (
              <p className="text-xs font-medium text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Role Dropdown Selector */}
          <div className="space-y-1">
            <Label htmlFor="role">Account Type / Role</Label>
            <select
              id="role"
              name="role"
              disabled={isPending}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue=""
            >
              <option value="" disabled>Select your role</option>
              <option value="TENANT">Tenant (Look for rentals)</option>
              <option value="LANDLORD">Landlord (List your property)</option>
              {/* <option value="ADMIN">Admin (System Manager)</option> */}
            </select>
            {state.errors?.role && (
              <p className="text-xs font-medium text-destructive">{state.errors.role[0]}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="space-y-1">
            <Label htmlFor="contactNo">Contact Number</Label>
            <Input
              id="contactNo"
              name="contactNo"
              type="text"
              placeholder="01712345678"
              disabled={isPending}
            />
            {state.errors?.contactNo && (
              <p className="text-xs font-medium text-destructive">{state.errors.contactNo[0]}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label htmlFor="address">Physical Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main St, Dhaka"
              disabled={isPending}
            />
            {state.errors?.address && (
              <p className="text-xs font-medium text-destructive">{state.errors.address[0]}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
            {state.errors?.password && (
              <p className="text-xs font-medium text-destructive">{state.errors.password[0]}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
            {state.errors?.confirmPassword && (
              <p className="text-xs font-medium text-destructive">{state.errors.confirmPassword[0]}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-4">
          <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
            {isPending ? "Creating Account..." : "Register"}
          </Button>

          <div className="flex flex-col items-center justify-between w-full space-y-2 text-sm pt-2 border-t text-muted-foreground">
            <div>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Login here
              </Link>
            </div>
            
            <Link href="/" className="hover:underline text-xs">
              ← Back Home
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}


// success: true,
//         statusCode: StatusCodes.OK,
//         message: "User registered successfully.",
//         data: {
//   id: true,
//   name: true,
//   email: true,
//   role: true,
//   address: true,
//   contactNo: true,
//   userStatus: true,
//   createdAt: true,
//   updatedAt: true,
// }
