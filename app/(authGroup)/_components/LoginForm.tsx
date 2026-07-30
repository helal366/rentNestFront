// (authGroup)/_components/LoginForm.tsx
"use client";

import { useActionState, startTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction } from "../_actions/loginActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginActionState } from "@/lib/types";

const initialState: LoginActionState = {
  success: false,
  message: "",
};

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  // Redirect on successful login
  useEffect(() => {
    if (state.success) {
      router.push("/dashboard"); // Adjust destination path as needed
      router.refresh();
    }
  }, [state.success, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        {/* Welcome note located at top center of form */}
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* General API errors */}
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
          <Button type="submit" className="w-full" disabled={isPending}>
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
