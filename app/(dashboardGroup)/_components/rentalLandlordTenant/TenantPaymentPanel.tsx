"use client";

import { useState } from "react";
import { CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPaymentGatewayAction } from "../../_actions/fetch_landlord_tenant_rentals";
import { RentRequestStatus } from "@/lib/types";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TenantPaymentPanelProps {
  requestId: string;
  requestStatus: RentRequestStatus;
  isPaid: boolean;
}

export function TenantPaymentPanel({
  requestId,
  requestStatus,
  isPaid,
}: TenantPaymentPanelProps) {
  const [isInitializing, setIsInitializing] = useState(false);

  // If the request isn't approved yet, we don't allow processing payment checkpoints
  if (requestStatus !== "APPROVED") return null;

  const handleCheckoutRedirect = async () => {
    setIsInitializing(true);

    const result = await createPaymentGatewayAction(requestId);

    if (result.success && result.data?.paymentUrl) {
      toast.success(
        "Checkout link verified. Forwarding to secure payment engine...",
      );
      // Forwards the window directly onto SSLCommerz sandbox or live web terminals
      window.location.replace(result.data.paymentUrl);
    } else {
      setIsInitializing(false);
      toast.error(result.message);
    }
  };

  return (
    <Card
      className={`border-l-4 ${isPaid ? "border-l-green-500 bg-green-50/5" : "border-l-blue-500 bg-blue-50/5"}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-primary" />
          Lease Settlement Hub
        </CardTitle>
        <CardDescription className="text-xs">
          {isPaid
            ? "Your financial lease terms are settled successfully."
            : "Your rental application is approved! Secure this property instantly by processing the first month's payment."}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {isPaid ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 p-2.5 rounded-md">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Transaction Cleared. Landlord modification controls are locked.
          </div>
        ) : (
          <Button
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 font-medium text-xs h-9 shadow-sm"
            disabled={isInitializing}
            onClick={handleCheckoutRedirect}
          >
            {isInitializing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Spawning Secure Terminal...
              </>
            ) : (
              <>Proceed to Checkout (SSLCommerz)</>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
