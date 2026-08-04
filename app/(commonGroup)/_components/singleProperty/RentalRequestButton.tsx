"use client";

import { Button } from "@/components/ui/button";
import { Role } from "@/lib/types";
import { toast } from "sonner";
import { useState } from "react";
import { createRentalRequestAction } from "../../_actions/createRentalRequestAction";

interface RentalRequestButtonProps {
  landlordId: string;
  propertyId: string;
  isLoggedIn: boolean;
  userRole?: Role;
  isAvailable: boolean;
  hasAlreadySubmitted:boolean
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

  

  const handleRentalRequest = async() => {
    // Hide the interactive button layout completely for non-TENANT profiles
    if (!isLoggedIn || userRole !== "TENANT") {
       toast.error(
         "Submission Denied", {
        description:
          "Login as TENANT to send rental request.",
      });
      return;
    }

    // Client-side fail-safe if duplicate matches found
    if (hasAlreadySubmitted) {
      toast.error("Submission Denied", {
        description:
          "You have already submitted an active rental request for this property.",
      });
      return;
    }
    

   try {
     setIsPending(true);
     const response = await createRentalRequestAction(propertyId, landlordId);

     if (response.success) {
       toast.success("Success", {
         description: response.message,
       });
     } else {
       // Renders real-time error payload messages sent straight from your backend AppError strings
       toast.error("Submission Failed", {
         description: response.message,
       });
     }
   } catch{
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
       <Button className="w-full" size="lg" disabled variant="secondary">
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
    <Button
      className="w-full bg-green-700 text-white hover:bg-green-800 cursor-pointer"
      size="lg"
      onClick={handleRentalRequest}
      disabled={isPending}
    >
      {isPending ? "Submitting Request..." : "Request to Rent Property"}
    </Button>
  );
}
