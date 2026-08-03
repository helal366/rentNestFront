import { Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropertyDetailSingle } from "../../_types/rental_landlord_tenant_types";

export function PropertyInsightsCard({
  property,
}: {
  property: PropertyDetailSingle;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <CardTitle>Property Insights</CardTitle>
        </div>
        <CardDescription>Category: {property.category.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Location
            </span>
            <p className="font-semibold text-sm">{property.location}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Rent Price</span>
            <p className="font-semibold text-sm text-primary">
              ৳{property.rentPrice.toLocaleString()} / month
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">
              Area Dimensions
            </span>
            <p className="font-semibold text-sm">{property.areaInSqFt} SqFt</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">
              Current Availability
            </span>
            <p className="font-semibold text-sm capitalize">
              {property.rentStatus.toLowerCase()}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-2">
            Amenities Included
          </h4>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <Badge
                key={amenity}
                variant="secondary"
                className="text-xs font-medium"
              >
                {amenity.replace("_", " ")}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
