"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  CreditCard,
  DollarSign,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get("status"); // 'success' | 'failed' | 'cancelled'
  const tranId = searchParams.get("tranId");
  const amount = searchParams.get("amount");
  const method = searchParams.get("method") || "SSLCOMMERZ";
  const date = searchParams.get("date");

  // 1. SUCCESS STATE
  if (status === "success") {
    return (
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-green-500">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="h-16 w-16 text-green-500 animate-bounce" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Your transaction has been processed securely.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg space-y-3 text-sm border">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-500 flex items-center gap-2">
                <Hash className="h-4 w-4" /> Transaction ID
              </span>
              <span className="font-mono font-bold text-gray-800">
                {tranId}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-500 flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Amount Paid
              </span>
              <span className="font-bold text-gray-800">
                {amount ? `${amount} BDT` : "6000 BDT"}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-500 flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Payment Method
              </span>
              <span className="font-medium text-gray-700 bg-gray-200 px-2 py-0.5 rounded text-xs uppercase">
                {method}
              </span>
            </div>
            {date && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Paid At
                </span>
                <span className="text-gray-700">
                  {new Date(date).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={() => router.push("/payments")}>
            View Payment History
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/landlord_dashboard")}
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // 2. CANCELLED STATE
  if (status === "cancelled") {
    return (
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-amber-500">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <AlertTriangle className="h-16 w-16 text-amber-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Payment Cancelled
          </CardTitle>
          <CardDescription>
            You closed the payment window before completing the process.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-600">
          No money was deducted from your account. You can retry the rental
          request payment at any time.
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600"
            onClick={() => router.push("/pay_rentals")}
          >
            Retry Payment Now
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/landlord_dashboard")}
          >
            Return Home
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // 3. FAILED STATE (OR DEFAULT FALLBACK)
  return (
    <Card className="w-full max-w-md shadow-xl border-t-4 border-t-red-500">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Payment Failed
        </CardTitle>
        <CardDescription>
          Your transaction could not be processed by the gateway.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center text-sm text-gray-600">
        This might be due to insufficient funds, an invalid card setup, or
        network connection issues. Please check with your provider.
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          onClick={() => router.push("/pay_rentals")}
        >
          Try Another Method
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.push("/landlord_dashboard")}
        >
          Back to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PaymentConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="text-sm font-medium text-slate-500 animate-pulse">
            Loading transaction data...
          </div>
        }
      >
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
