// (authGroup)/_components/LoginForm.tsx
"use client";

import { useActionState,  useEffect } from "react";
import Link from "next/link";
import { loginAction } from "../_actions/loginActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginActionState } from "@/lib/types";
import { toast } from "sonner";

const initialState: LoginActionState = {
  success: false,
  statusCode: 0,
  message: "",
  data: {
    accessToken: "",
    refreshToken: ""
  }
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  
  useEffect(() => {
    if (!state || state.statusCode === 0) {
      return;
    }

    if (state.success) {
      toast.success(state.message || "Login successful.");
    } else {
      toast.error(state.message || "Login failed");
    }
  }, [state]);  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      
      <form action={formAction}>
        <CardContent className="space-y-4">
          {!state.success && state.message && !state.errors && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              disabled={isPending}
            />
            {state.errors?.email && (
              <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
            />
            {state.errors?.password && (
              <p className="text-sm font-medium text-destructive">{state.errors.password[0]}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <div className="flex flex-col items-center justify-between w-full space-y-2 text-sm pt-2 border-t text-muted-foreground">
            <div>
              New here?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Register Now
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
