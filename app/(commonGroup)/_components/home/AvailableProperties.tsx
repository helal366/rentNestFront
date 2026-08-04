import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "./PropertyCard";
import { fetchAvailableProperties } from "../../_actions/home/homeActions";
import { ArrowRight, HelpCircle } from "lucide-react";

export async function AvailableProperties() {
  // Server-side invocation fetching properties from your backend endpoint
  const response = await fetchAvailableProperties(6);

  if (!response || !response.success || !response.data?.properties) {
    return (
      <section className="py-12 bg-white text-center">
        <p className="text-sm text-destructive font-medium">
          Failed to establish connections to RentNest database.
        </p>
      </section>
    );
  }

  const properties = response.data.properties;

  return (
    <section className="py-16 bg-white text-black border-b border-neutral-100">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading Group */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-olive-200/50 border border-olive-300 text-green-600 text-xs font-semibold">
              Live Listings
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Explore Available Nests
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Verified active listings with verified properties matching live
              rental application access models.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-olive-300 text-[#3E4A36] hover:bg-olive-100/30 font-semibold self-center sm:self-auto cursor-pointer"
          >
            <Link
              href="/properties"
              className="flex items-center gap-1.5 text-xs"
            >
              Browse All Listings <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Empty Collection State Fallback Grid */}
        {properties.length === 0 ? (
          <div className="border border-dashed border-neutral-200 bg-neutral-50/50 rounded-xl p-12 text-center max-w-md mx-auto space-y-3">
            <div className="p-3 bg-neutral-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-neutral-400">
              <HelpCircle className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-neutral-800">
              No properties open right now
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All listed nests are currently occupied or processing rental
              request agreements. Check back shortly.
            </p>
          </div>
        ) : (
          /* Grid Presentation Panel */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
