import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchRecentlyAddedProperties } from "../../_actions/home/recentlyAddedActions";
import { MapPin, CalendarDays, ArrowRight, Maximize } from "lucide-react";

export async function RecentlyAddedProperties() {
  const response = await fetchRecentlyAddedProperties(3);

  if (!response || !response.success || !response.data?.properties) {
    return null; // Gracefully hide the block if backend signals break down
  }

  const freshProperties = response.data.properties;

  if (freshProperties.length === 0) return null;

  return (
    <section className="py-16 bg-neutral-50 text-black border-b border-neutral-100">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading Group */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-olive-300 pb-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
              New Additions
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-black">
              Just Added to RentNest
            </h2>
            <p className="text-muted-foreground text-xs font-medium">
              Fresh opportunities updated moments ago. Be among the first
              tenants to submit an application.
            </p>
          </div>

          <Button
            asChild
            variant="link"
            className="text-green-600 hover:text-green-700 font-bold text-xs p-0 gap-1 self-center sm:self-auto cursor-pointer"
          >
            <Link href="/properties">
              View All Recent Listings <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Horizontal Row Presentation Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {freshProperties.map((property) => (
            <Card
              key={property.id}
              className="bg-olive-200 border border-olive-300 transition-all duration-300 hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              <CardContent className="p-5 space-y-4">
                {/* Upper Metadata Flag Header */}
                <div className="flex justify-between items-center text-xs">
                  <Badge className="bg-white text-black hover:bg-white text-[9px] font-bold border border-olive-300 shadow-none uppercase">
                    {property.category.name}
                  </Badge>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                    <CalendarDays className="h-3.5 w-3.5 text-green-600" /> New
                    Today
                  </div>
                </div>

                {/* Pricing & Location Parameters Container */}
                <div className="space-y-2">
                  <p className="text-xl font-black text-black tracking-tight leading-none">
                    TK {property.rentPrice.toLocaleString()}
                    <span className="text-xs font-semibold text-neutral-700">
                      {" "}
                      / mo
                    </span>
                  </p>

                  <div className="flex items-center gap-1.5 text-black text-sm font-extrabold pt-1">
                    <MapPin className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-800 font-bold">
                    <Maximize className="h-3.5 w-3.5 text-green-600 shrink-0" />
                    <span>
                      {property.areaInSqFt.toLocaleString()} Sq Ft Layer
                    </span>
                  </div>
                </div>

                {/* Dynamic Content Divider Line */}
                <div className="border-t border-olive-300/60 pt-3 flex items-center justify-between gap-4">
                  <p className="text-[10px] text-neutral-700 font-bold truncate">
                    Landlord:{" "}
                    <span className="text-black font-black">
                      {property.landlord.name}
                    </span>
                  </p>

                  <Button
                    asChild
                    size="sm"
                    className="h-8 bg-green-600 text-white hover:bg-green-700 font-bold text-xs px-3 shadow-none cursor-pointer shrink-0"
                  >
                    <Link href={`/properties/${property.id}`}>Apply Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
