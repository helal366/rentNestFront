import Link from "next/link";
import { LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllRentalRequestsAction } from "../_actions/fetch_landlord_tenant_rentals";

export default async function RentalRequestsPage() {
  let requests = [];

  try {
    // Automatically extracts the accessToken cookie from request contexts
    requests = await getAllRentalRequestsAction();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Authentication or fetching failure");
    }

    return (
      <div className="container mx-auto p-6 max-w-md mt-12">
        <Card className="text-center p-6 border-destructive/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-destructive">Session Expired</CardTitle>
            <CardDescription>
              Please sign in again to view your dashboard requests.
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-600 text-white hover:bg-green-600";
      case "REJECTED":
        return "bg-destructive text-destructive-foreground hover:bg-destructive";
      default:
        return "bg-amber-500 text-white hover:bg-amber-500";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
        <p className="text-muted-foreground text-sm">
          Overview of all incoming and outgoing property rental requests.
        </p>
      </div>

      {requests.length === 0 ? (
        <Card className="p-12 text-center">
          <CardDescription>No rental requests found.</CardDescription>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg capitalize">
                      {item.rentalRequestProperty.location.toLowerCase()}{" "}
                      Property
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Area: {item.rentalRequestProperty.areaInSqFt} SqFt
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(item.requestStatus)}>
                    {item.requestStatus}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 text-sm pb-4">
                <div className="border-t pt-3 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Landlord:</span>
                    <span className="font-medium text-xs">
                      {item.landlord.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rent Status:</span>
                    <span className="text-xs font-semibold">
                      {item.rentalRequestProperty.rentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment:</span>
                    <span>
                      {item.isPaid ? (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600 bg-green-50"
                        >
                          Paid
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-amber-600 border-amber-600 bg-amber-50"
                        >
                          Unpaid
                        </Badge>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {item.rentalRequestProperty.amenities
                    .slice(0, 3)
                    .map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[10px] bg-secondary px-2 py-0.5 rounded text-secondary-foreground"
                      >
                        {amenity}
                      </span>
                    ))}
                  {item.rentalRequestProperty.amenities.length > 3 && (
                    <span className="text-[10px] text-muted-foreground self-center pl-1">
                      +{item.rentalRequestProperty.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <Button
                  asChild
                  className="w-full mt-2"
                  variant="outline"
                  size="sm"
                >
                  <Link href={`/rental_requests/${item.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
