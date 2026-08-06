import { getAllRentalRequestsAction } from "../_actions/fetch_landlord_tenant_rentals";
import { getMe } from "@/services/getMe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { GroupedPropertySection, RentalRequestAllItem } from "../_types/rental_landlord_tenant_types";
import { PropertySection } from "../_components/rentalLandlordTenant/PropertySection";

export const dynamic = "force-dynamic";

export default async function RentalRequestsPage() {
  let rawRequests = [] as RentalRequestAllItem[];
  let user;

  try {
    rawRequests = await getAllRentalRequestsAction();
    user = await getMe();
  } catch {
    return (
      <div className="container mx-auto p-6 max-w-md mt-12">
        <Card className="text-center p-6 border-destructive/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-destructive">Session Expired</CardTitle>
            <CardDescription>
              Please sign in again to view requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full gap-2">
              <Link href="/login">
                <LogIn className="h-4 w-4" /> Go to Login
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userRole = user?.data?.role;

  // Transform flat array into a grouped layout structure
  const groupedMap = new Map<string, GroupedPropertySection>();
  rawRequests.forEach((item) => {
    const propId = item.propertyId;
    if (!groupedMap.has(propId)) {
      groupedMap.set(propId, {
        property: item.rentalRequestProperty,
        landlord: item.landlord,
        requests: [],
      });
    }
    groupedMap.get(propId)!.requests.push({
      id: item.id,
      tenantId: item.tenantId,
      requestStatus: item.requestStatus,
      isPaid: item.isPaid,
      createdAt: item.createdAt,
    });
  });

  const sections = Array.from(groupedMap.values());

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
        <p className="text-muted-foreground text-sm">
          Organized systematically by property.
        </p>
      </div>

      {sections.length === 0 ? (
        <Card className="p-12 text-center">
          <CardDescription>No rental requests found.</CardDescription>
        </Card>
      ) : (
        <div className="space-y-12">
          {sections.map((section) => (
            <PropertySection
              key={section.property.id}
              section={section}
              userRole={userRole}
            />
          ))}
        </div>
      )}
    </div>
  );
}
