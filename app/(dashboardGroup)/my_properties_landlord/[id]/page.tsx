import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { fetchLandlordPropertyById } from "../../_actions/landlordMyPropertiesActions";
import { PropertyManagementWidget } from "../../_components/myPropertiesLandlord/PropertyManagementWidget";
import { PropertyDetails } from "@/app/(commonGroup)/_types/singlePropertyTypes";
import LeftSideContent from "../../_components/mySinglePropertyLandlord/LeftSideContent";

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
        <LeftSideContent property={property}/>

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
