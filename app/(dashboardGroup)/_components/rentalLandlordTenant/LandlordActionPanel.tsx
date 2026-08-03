"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner"; // Or your preferred toast provider component
import { updateRentalRequestStatusAction } from "../../_actions/fetch_landlord_tenant_rentals";

interface LandlordActionPanelProps {
  requestId: string;
  currentStatus: "PENDING" | "APPROVED" | "REJECTED";
  isPaid: boolean;
}

export function LandlordActionPanel({
  requestId,
  currentStatus,
  isPaid,
}: LandlordActionPanelProps) {
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState<
    "PENDING" | "APPROVED" | "REJECTED" | null
  >(null);

  const handleStatusChange = async (
    targetStatus: "PENDING" | "APPROVED" | "REJECTED",
  ) => {
    // Basic service-level rule validation safeguards on UI side
    if (
      isPaid &&
      (targetStatus === "PENDING" || targetStatus === "REJECTED") &&
      currentStatus === "APPROVED"
    ) {
      toast.error(
        "Cannot modify status. Payment is already completed for this lease.",
      );
      return;
    }

    setLoadingStatus(targetStatus);

    const result = await updateRentalRequestStatusAction(
      requestId,
      targetStatus,
    );

    setLoadingStatus(null);

    if (result.success) {
      toast.success(result.message);
      router.refresh(); // Triggers server component re-fetch to balance visual state logs
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Card className="border-amber-200/60 bg-amber-50/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold tracking-tight">
          Landlord Controls
        </CardTitle>
        <CardDescription className="text-xs">
          Manage lease workflows. Changing state propagates ecosystem cascades
          on dependent records.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {currentStatus === "PENDING" && (
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white gap-1.5 text-xs h-9"
              disabled={loadingStatus !== null}
              onClick={() => handleStatusChange("APPROVED")}
            >
              {loadingStatus === "APPROVED" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Check className="h-3.5 w-3.5" />
              )}
              Approve Request
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="gap-1.5 text-xs h-9"
              disabled={loadingStatus !== null}
              onClick={() => handleStatusChange("REJECTED")}
            >
              {loadingStatus === "REJECTED" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
              Reject Request
            </Button>
          </div>
        )}

        {currentStatus === "APPROVED" && (
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-1.5 text-xs h-9 border-amber-300 text-amber-700 hover:bg-amber-50"
            disabled={loadingStatus !== null || isPaid}
            onClick={() => handleStatusChange("PENDING")}
          >
            {loadingStatus === "PENDING" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            Revert to Pending
          </Button>
        )}

        {currentStatus === "REJECTED" && (
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-1.5 text-xs h-9"
            disabled={loadingStatus !== null}
            onClick={() => handleStatusChange("PENDING")}
          >
            {loadingStatus === "PENDING" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            Reset back to Pending
          </Button>
        )}

        {isPaid && (
          <p className="text-[10px] text-muted-foreground text-center mt-1 italic">
            * Actions locked because payment processing is completed.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
