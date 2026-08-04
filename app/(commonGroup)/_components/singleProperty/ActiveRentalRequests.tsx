"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/lib/types";
import { RentRequestItem } from "../../_types/singlePropertyTypes";

interface ActiveRentalRequestsProps {
  requests: RentRequestItem[];
  isLoggedIn: boolean;
  userRole?: Role;
}

export function ActiveRentalRequests({
  requests,
  isLoggedIn,
  userRole,
}: ActiveRentalRequestsProps) {
  // Restrict access for unauthenticated (unlogged) users
  if (!isLoggedIn || !userRole) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight text-foreground px-1">
        Active Rental Requests ({requests.length})
      </h3>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-center text-muted-foreground text-sm">
            No active rental requests for this property yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((request, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="pt-4 space-y-2 text-sm">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <p className="font-semibold text-foreground">
                    Applicant: {request.tenant.name}
                  </p>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        request.requestStatus === "APPROVED"
                          ? "default"
                          : request.requestStatus === "PENDING"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {request.requestStatus}
                    </Badge>
                    <Badge
                      variant={request.isPaid ? "secondary" : "destructive"}
                    >
                      {request.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> {request.tenant.email}
                  </p>
                  <p>
                    <strong>Contact:</strong> {request.tenant.contactNo}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
