"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Role } from "@/lib/types";
import { toast } from "sonner";

interface RentalRequestButtonProps {
  propertyId: string;
  isLoggedIn: boolean;
  userRole?: Role;
  isAvailable: boolean;
}

export function RentalRequestButton({
  propertyId,
  isLoggedIn,
  userRole,
  isAvailable,
}: RentalRequestButtonProps) {
  const router = useRouter();

  const handleRentalRequest = () => {
    // Rule 1: Check login status
    if (!isLoggedIn) {
      toast.error("Authentication Required", {
        description: "Please log in to submit a rental request.",
      });
      router.push("/login");
      return;
    }

    // Rule 2: Check active role authorization
    if (userRole !== "TENANT") {
      toast.error("Access Denied", {
        description: `Your account role (${userRole}) is not permitted to make rental requests. Only TENANTs can request rentals.`,
      });
      return;
    }

    // Pass: Safe to continue logic execution once you provide the create endpoint
   toast.success("Authorized", {
     description:
       "Processing request setup... (Awaiting endpoint connectivity)",
   });
  };

  if (!isAvailable) {
    return (
      <Button className="w-full" size="lg" disabled variant="secondary">
        Unavailable for Rent
      </Button>
    );
  }

  return (
    <Button className="w-full" size="lg" onClick={handleRentalRequest}>
      Request to Rent Property
    </Button>
  );
}
