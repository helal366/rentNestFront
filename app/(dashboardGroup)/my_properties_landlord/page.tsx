import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Maximize,
  Settings2,
  PlusCircle,
  CheckCircle,
} from "lucide-react";
import { fetchLandlordProperties } from "../_actions/landlordMyPropertiesActions";
import { getAllPropertiesItem } from "../_types/my_properties_landlord_types";

export const metadata = {
  title: "My Properties | Landlord Dashboard",
};

export default async function MyPropertiesLandlordPage() {
  const response = await fetchLandlordProperties();
  const properties = response.data;

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8 space-y-8 text-black bg-white">
      {/* Upper Dashboard Header Action Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-olive-300 pb-4">
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-extrabold tracking-tight">
            My Managed Nests
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            Review active requests, update rental parameters, or manage property
            availability matrices.
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white font-bold cursor-pointer"
        >
          <Link
            href="/my_properties_landlord/create"
            className="flex items-center gap-1.5"
          >
            <PlusCircle className="h-4 w-4" /> Add New Nest
          </Link>
        </Button>
      </div>

      {/* Empty State Fallback Layout */}
      {properties.length === 0 ? (
        <div className="border border-dashed border-olive-300 bg-olive-200 rounded-xl p-12 text-center max-w-md mx-auto space-y-3">
          <p className="text-sm font-bold text-black">
            No listings found in your account
          </p>
          <p className="text-xs text-neutral-800 leading-relaxed font-semibold">
            You have not listed any real estate assets on RentNest yet. Click
            the button above to publish your first property.
          </p>
        </div>
      ) : (
        /* Matrix Grid Content */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: getAllPropertiesItem) => (
            <Card
              key={property.id}
              className="bg-olive-200 border border-olive-300 flex flex-col justify-between h-full overflow-hidden"
            >
              <CardHeader className="p-4 pb-2 space-y-2">
                <div className="flex justify-between items-center">
                  <Badge className="bg-white text-black hover:bg-white text-[9px] font-extrabold uppercase border border-olive-300 shadow-none">
                    {property.category.name}
                  </Badge>
                  <Badge
                    variant={
                      property.rentStatus === "AVAILABLE"
                        ? "default"
                        : "destructive"
                    }
                    className={
                      property.rentStatus === "AVAILABLE"
                        ? "bg-green-600 text-white border-0 text-[10px]"
                        : "text-[10px]"
                    }
                  >
                    {property.rentStatus}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-black text-black tracking-tight">
                  TK {property.rentPrice.toLocaleString()}{" "}
                  <span className="text-xs font-semibold text-neutral-700">
                    / mo
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-2 text-xs font-semibold text-neutral-800 flex-1 text-left">
                <div className="flex items-center gap-1.5 text-black text-sm font-bold">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="truncate">{property.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Maximize className="h-3.5 w-3.5 text-green-600" />
                  <span>{property.areaInSqFt.toLocaleString()} Sq Ft area</span>
                </div>
                <div className="flex items-center gap-1.5 text-green-600 pt-1">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>
                    {property.propertyRentRequests?.length || 0} applications
                    submitted
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 border-t border-olive-300/40 mt-2 bg-olive-300/30">
                <Button
                  asChild
                  size="sm"
                  className="w-full bg-[#2D3627] text-white hover:bg-black text-xs font-bold mt-3 shadow-none cursor-pointer"
                >
                  <Link
                    href={`/my_properties_landlord/${property.id}`}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <Settings2 className="h-3.5 w-3.5" /> Property Operations
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
