import React from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { fetchLandlordPropertyById } from "@/app/(dashboardGroup)/_actions/landlordMyPropertiesActions";
import { UpdatePropertyForm } from "@/app/(dashboardGroup)/_components/myPropertiesLandlord/UpdatePropertyForm";

interface UpdatePropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function LandlordUpdatePropertyPage({
  params,
}: UpdatePropertyPageProps) {
  const { id } = await params;

  // Resolve existing resource payload states ahead of template initialization
  const propertyRes = await fetchLandlordPropertyById(id);

  if (!propertyRes || !propertyRes.success || !propertyRes.data?.property) {
    notFound();
  }

  const property = propertyRes.data.property;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8 text-black bg-white">
      <div className="space-y-6">
        {/* Action Node Header Row Description */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl font-black tracking-tight text-neutral-900 flex items-center gap-2">
            <Settings className="h-6 w-6 text-green-600" /> Edit Nest
            Specifications
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            Modify price points, adjust amenities records, or update vacancy
            states. All edits are logged instantly inside data arrays.
          </p>
        </div>

        {/* Structural Form Component Wrapper Box */}
        <Card className="bg-olive-200 border border-olive-300 shadow-none">
          <CardHeader className="border-b border-olive-300/40 pb-4">
            <CardTitle className="text-sm font-black text-neutral-800">
              Editing Target Unique ID Reference Code:{" "}
              <span className="font-mono text-black text-xs font-bold bg-white/70 px-2 py-0.5 rounded border border-olive-300/40 ml-1">
                {property.id}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <UpdatePropertyForm property={property} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
