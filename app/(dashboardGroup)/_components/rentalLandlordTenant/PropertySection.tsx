import { Badge } from "@/components/ui/badge";
import { GroupedPropertySection } from "../../_types/rental_landlord_tenant_types";
import { RequestCard } from "./RequestCard";

interface PropertySectionProps {
  section: GroupedPropertySection;
  userRole?: string;
}

export function PropertySection({ section, userRole }: PropertySectionProps) {
  const { property, landlord, requests } = section;

  return (
    <section className="border border-border/60 rounded-xl p-6 bg-card shadow-sm space-y-6">
      {/* Upper common header layout block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold capitalize tracking-tight text-foreground">
              {property.location.toLowerCase()} Property
            </h2>
            <Badge
              variant="secondary"
              className="text-xs uppercase font-semibold"
            >
              {property.rentStatus}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Area:{" "}
            <span className="font-medium text-foreground">
              {property.areaInSqFt} SqFt
            </span>
          </p>

          <div className="flex flex-wrap gap-1 pt-1">
            {property.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="text-[10px] bg-secondary px-2 py-0.5 rounded text-secondary-foreground uppercase font-medium"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 4 && (
              <span className="text-[10px] text-muted-foreground self-center pl-1">
                +{property.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Common Landlord data layout block */}
        <div className="text-left md:text-right bg-secondary/30 rounded-lg p-3 border border-border/40 min-w-50">
          <span className="text-xs uppercase tracking-wider text-muted-foreground block font-bold mb-0.5">
            Assigned Landlord
          </span>
          <p className="font-semibold text-sm text-foreground">
            {landlord.name}
          </p>
          <p className="text-xs text-muted-foreground">{landlord.email}</p>
        </div>
      </div>

      {/* Sub Cards Loop Grid Section */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase font-bold tracking-widest text-muted-foreground/80 px-1">
          Requests Breakdown ({requests.length})
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <RequestCard key={req.id} req={req} userRole={userRole} />
          ))}
        </div>
      </div>
    </section>
  );
}
