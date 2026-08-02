import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import rawPropertiesData from "../../../others/properties_demodata.json";
import {
  getAllPropertiesItem,
} from "../../_types/propertyTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PropertyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const mockData = rawPropertiesData as getAllPropertiesItem[];
const propertiesData = mockData as unknown as getAllPropertiesItem[];

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
    
  const resolvedParams = await params;

  // Find the requested listing by matching its unique ID string
  const property = propertiesData.find((p) => p.id === resolvedParams.id);

  // If no matching profile is found, safely fallback to the Next.js standard 404 page
  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl min-h-screen">
      {/* Navigation Breadcrumb Action Bar */}
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/properties">← Back to Listings</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details Panel Layout */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{property.category.name}</Badge>
                <Badge
                  variant={
                    property.rentStatus === "RENTED"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {property.rentStatus}
                </Badge>
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight">
                📍 {property.location}
              </CardTitle>
              <CardDescription className="text-lg">
                Spacious configuration measuring{" "}
                <span className="font-semibold text-foreground">
                  {property.areaInSqFt} Sq Ft
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase mb-2">
                  Monthly Rental Rate
                </h3>
                <div className="text-4xl font-extrabold text-primary">
                  {property.rentPrice.toLocaleString()}
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    TK / month
                  </span>
                </div>
              </div>

              <hr className="border-muted" />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase mb-3">
                  Included Utilities & Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="text-xs py-1 px-2.5 uppercase tracking-wider"
                      >
                        {amenity.replace("_", " ")}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No specialized utilities logged for this unit.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rental Applications Status History Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Application Activity Log
              </CardTitle>
              <CardDescription>
                Historical overview of processing client rental inquiries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {property.propertyRentRequests.length > 0 ? (
                <div className="divide-y divide-muted border rounded-lg overflow-hidden">
                  {property.propertyRentRequests.map((request, idx) => (
                    <div
                      key={request.id}
                      className="flex justify-between items-center p-3 text-sm bg-background hover:bg-muted/20"
                    >
                      <span className="font-mono text-muted-foreground text-xs">
                        Req #{idx + 1} ({request.id.slice(0, 8)})
                      </span>
                      <div className="flex gap-2 items-center">
                        <Badge variant={request.isPaid ? "default" : "outline"}>
                          {request.isPaid ? "Paid Deposit" : "Unpaid"}
                        </Badge>
                        <Badge
                          variant={
                            request.requestStatus === "APPROVED"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {request.requestStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic p-4 text-center border border-dashed rounded-lg">
                  No active rental application records submitted yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stakeholder Contacts Sidebar Panel */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Host Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">
                  Landlord Profile Name
                </p>
                <p className="font-medium text-base">
                  {property.landlord.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Landlord Email</p>
                <p className="font-mono text-foreground">
                  {property.landlord.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Landlord Contact Line
                </p>
                <p className="font-medium">{property.landlord.contactNo}</p>
              </div>
              {property.landlord.userStatus === "BANNED" && (
                <div className="mt-2 text-xs font-semibold text-destructive bg-destructive/10 p-2 rounded border border-destructive/20">
                  ⚠️ Administrative warning: Landlord account holds a suspension
                  status flag.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Leaseholder Assignment Status Block */}
          {property.approvedTenant && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Current Occupant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Tenant Name</p>
                  <p className="font-medium text-base">
                    {property.approvedTenant.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Contact Number
                  </p>
                  <p className="font-medium">
                    {property.approvedTenant.contactNo}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
 