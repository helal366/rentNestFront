import React from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Maximize, Layers } from "lucide-react";
import { fetchLandlordPropertyById } from "../../_actions/landlordMyPropertiesActions";
import { PropertyManagementWidget } from "../../_components/myPropertiesLandlord/PropertyManagementWidget";
import { PropertyDetails } from "@/app/(commonGroup)/_types/singlePropertyTypes";

interface LandlordPropertyDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function LandlordPropertyDetailsPage({
  params,
}: LandlordPropertyDetailsPageProps) {
  const { id } = await params;
  const propertyRes = await fetchLandlordPropertyById(id);

  if (!propertyRes || !propertyRes.success || !propertyRes.data?.property) {
    notFound();
  }

  const property: PropertyDetails = propertyRes.data.property;

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8 text-black bg-white">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side Content Column: Information Data Blocks */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className="bg-olive-200 border-olive-300 text-black text-xs font-bold uppercase tracking-wider"
              >
                {property.category.name.toLowerCase()}
              </Badge>
              <Badge
                className={
                  property.rentStatus === "AVAILABLE"
                    ? "bg-green-600 text-white text-xs"
                    : "text-xs"
                }
              >
                {property.rentStatus}
              </Badge>
            </div>
            <h1 className="text-xl font-black tracking-tight text-neutral-900 sm:text-2xl">
              {property.areaInSqFt.toLocaleString()} Sq Ft Listing Control Node
            </h1>
            <p className="text-2xl font-black text-green-600 mt-1">
              TK {property.rentPrice.toLocaleString()}{" "}
              <span className="text-xs font-semibold text-neutral-500">
                / month base asset value
              </span>
            </p>
          </div>

          {/* Quick Specifications Info Grid */}
          <Card className="bg-olive-200 border border-olive-300 shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-extrabold text-black">
                Property Blueprint Variables
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-xs font-bold text-neutral-800">
              <div>
                <p className="text-neutral-500 font-semibold mb-0.5">
                  Location zone coordinate
                </p>
                <p className="text-black text-sm font-black flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-green-600" />{" "}
                  {property.location}
                </p>
              </div>
              <div>
                <p className="text-neutral-500 font-semibold mb-0.5">
                  Dimensional footprint size
                </p>
                <p className="text-black text-sm font-black flex items-center gap-1">
                  <Maximize className="h-3.5 w-3.5 text-green-600" />{" "}
                  {property.areaInSqFt} Sq Ft
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Amenities Module Grid */}
          <Card className="bg-olive-200 border border-olive-300 shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-extrabold text-black">
                Declared Amenities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {property.amenities?.map((amenity: string) => (
                  <Badge
                    key={amenity}
                    className="bg-white border border-olive-300 text-black hover:bg-white font-bold text-xs uppercase px-2.5 py-1 shadow-none"
                  >
                    {amenity.replace("_", " ")}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Column: Operations Control Card Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 border border-olive-300 bg-olive-200">
            <CardHeader>
              <CardTitle className="text-lg font-black text-black flex items-center gap-2">
                <Layers className="h-5 w-5 text-green-600" /> Management Node
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b border-olive-300 pb-2 text-xs font-bold text-neutral-800">
                <span className="text-neutral-500">Asset Accounting Code</span>
                <span className="text-black font-extrabold text-[10px] truncate max-w-30">
                  {property.id}
                </span>
              </div>

              {/* Mount the Interactive Triggers (Update and Delete Buttons) */}
              <PropertyManagementWidget propertyId={property.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
