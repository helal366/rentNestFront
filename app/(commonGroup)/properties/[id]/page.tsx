import { notFound } from "next/navigation";
import { getMe } from "@/services/getMe";
import { fetchPropertyById } from "../../_actions/singlePropertyActions";
import { RentalRequestButton } from "../../_components/singleProperty/RentalRequestButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SinglePropertyMainDetailsPanel from "../../_components/singleProperty/SinglePropertyMainDetailsPanel";

interface PropertyDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;

  // Run user session analysis and property fetching concurrently
  const [propertyRes, userRes] = await Promise.all([
    fetchPropertyById(id),
    getMe(),
  ]);

  if (!propertyRes || !propertyRes.success || !propertyRes.data?.property) {
    notFound();
  }

  const property = propertyRes.data.property;
  const isLoggedIn = !!(userRes && userRes.success && userRes.data);
  const userRole = userRes?.data?.role;
  const currentUserEmail = userRes?.data?.email;

  // Compute submission status on the server layer by evaluating the backend requests array data
  const hasAlreadySubmitted = property.propertyRentRequests.some(
    (request) => request.tenant.email === currentUserEmail,
  );  

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Details Panel */}
        <SinglePropertyMainDetailsPanel 
            property={property}
            isLoggedIn={isLoggedIn}
            userRole={userRole}
        />

        {/* Action Sidebar Action Widget Column */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-xl">Submit Rental Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Monthly Rent</span>
                <span className="font-semibold text-foreground">
                  TK {property.rentPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Service Fee</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <RentalRequestButton
                landlordId={property.landlordId}
                propertyId={property.id}
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                isAvailable={property.rentStatus === "AVAILABLE"}
                hasAlreadySubmitted={hasAlreadySubmitted}
              />

              {isLoggedIn && userRole !== "TENANT" && (
                <p className="text-xs text-destructive text-center font-medium mt-2">
                  Rental submissions are exclusive to TENANT profiles. Your
                  current profile role is recognized as {userRole}.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
