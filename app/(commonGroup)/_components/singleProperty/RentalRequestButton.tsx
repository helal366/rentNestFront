"use client";

import { Button } from "@/components/ui/button";
import { Role } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";
import { createRentalRequestAction } from "../../_actions/createRentalRequestAction";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RentalRequestButtonProps {
  landlordId: string;
  propertyId: string;
  isLoggedIn: boolean;
  userRole?: Role;
  isAvailable: boolean;
  hasAlreadySubmitted: boolean;
}

export function RentalRequestButton({
  landlordId,
  propertyId,
  isLoggedIn,
  userRole,
  isAvailable,
  hasAlreadySubmitted,
}: RentalRequestButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Initial trigger validation layer before modal opening
  const handleTriggerVerification = (e: React.MouseEvent) => {
    if (!isLoggedIn || userRole !== "TENANT") {
      e.preventDefault();
      toast.error("Submission Denied", {
        description: "Login as TENANT to send rental request.",
      });
      return;
    }

    if (hasAlreadySubmitted) {
      e.preventDefault();
      toast.error("Submission Denied", {
        description:
          "You have already submitted an active rental request for this property.",
      });
      return;
    }
  };

  // Backend Action Execution logic
  const handleRentalRequest = async () => {
    setIsOpen(false); // Cleanly dismiss the centered window immediately

    try {
      setIsPending(true);
      const response = await createRentalRequestAction(propertyId, landlordId);

      if (response.success) {
        toast.success("Success", {
          description: response.message,
        });
      } else {
        toast.error("Submission Failed", {
          description: response.message,
        });
      }
    } catch {
      toast.error("Network Error", {
        description:
          "An unexpected connection failure occurred. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  if (!isAvailable) {
    return (
      <Button className="w-full" size="lg" disabled variant="destructive">
        Unavailable for Rent
      </Button>
    );
  }

  if (hasAlreadySubmitted) {
    return (
      <Button className="w-full" size="lg" disabled variant="outline">
        Request Already Submitted
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-green-700 text-white hover:bg-green-800 cursor-pointer disabled:opacity-70"
          size="lg"
          onClick={handleTriggerVerification}
          disabled={isPending}
        >
          {isPending ? "Submitting Request..." : "Request to Rent Property"}
        </Button>
      </DialogTrigger>

      {/* Backdrop overlay layer handled implicitly by Shadcn/Radix primitive class tracking */}
      <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200 text-black shadow-2xl rounded-2xl backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-gray-900 tracking-tight">
            Confirm Rental Request
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-2 leading-relaxed">
            Are you sure you want to dispatch a formal rental application for
            this listing? This action will alert the landlord immediately.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-row justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="font-semibold border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleRentalRequest}
            className="bg-green-700 text-white hover:bg-green-800 font-semibold px-6"
          >
            Confirm Submission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
