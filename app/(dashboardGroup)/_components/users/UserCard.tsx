"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LandlordPropertyUsers, TenantReviewUsers } from "../../_types/users_types";

// Component A: Individual Review Card item
export function UserReviewCard({ review }: { review: TenantReviewUsers }) {
  return (
    <Card className="shadow-none bg-background">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <Badge
          variant="outline"
          className="text-amber-600 border-amber-200 bg-amber-50"
        >
          ★ {review.rating}/5
        </Badge>
        <span className="text-xs text-muted-foreground font-medium">
          {review.property.location}
        </span>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <p className="text-sm text-foreground italic">{review.content}</p>
        <div className="text-xs text-muted-foreground border-t pt-2 mt-2">
          Size: {review.property.areaInSqFt} SqFt • Landlord:{" "}
          {review.property.landlord.name}
        </div>
      </CardContent>
    </Card>
  );
}

// Component B: Individual Property Status Card item
export function UserPropertyCard({ prop }: { prop: LandlordPropertyUsers }) {
  return (
    <Card className="shadow-none bg-background">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold">{prop.category.name} ({prop.areaInSqFt} SqFt)</CardTitle>
          <span className="text-sm font-semibold text-primary">{prop.rentPrice} BDT</span>
        </div>
        <CardDescription className="text-xs">Location: {prop.location}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="rounded-lg border bg-muted/40 p-3 text-xs space-y-2">
          <div className="font-semibold text-foreground">
            Rental Requests ({prop._count?.propertyRentRequests ?? 0})
          </div>
          {prop.propertyRentRequests.length === 0 ? (
            <div className="text-muted-foreground italic">No historical rent requests.</div>
          ) : (
            <div className="space-y-1.5 max-h-24 overflow-y-auto">
              {prop.propertyRentRequests.map((req, reqIdx) => (
                <div key={reqIdx} className="flex justify-between items-center text-muted-foreground">
                  <span>{req.tenant.name}</span>
                  <div className="flex gap-1 items-center">
                    <Badge variant={req.requestStatus === "APPROVED" ? "default" : "outline"} className="text-[10px] px-1.5 py-0">
                      {req.requestStatus}
                    </Badge>
                    {req.isPaid && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                        Paid
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
