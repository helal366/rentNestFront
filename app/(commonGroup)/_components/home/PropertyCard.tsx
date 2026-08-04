"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PropertyItem } from "../../_actions/home/homeActions";

interface PropertyCardProps {
  property: PropertyItem;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="group border border-olive-300/60 bg-olive-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full overflow-hidden">
      
      {/* Upper Status Section Header */}
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex justify-between items-start">
          {/* Using a solid background layer over olive-200 to lift the category */}
          <Badge
            variant="outline"
            className="bg-white/80 border-olive-300 text-[#2D3627] text-[10px] font-bold uppercase tracking-wider"
          >
            {property.category.name.toLowerCase()}
          </Badge>
          
          {/* Light-Green background container paired with Deep-Green text overlay */}
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-900 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200/50">
            <CheckCircle2 className="h-3 w-3 text-emerald-800" /> AVAILABLE
          </div>
        </div>

        <div>
          <p className="text-xl font-extrabold text-black tracking-tight">
            TK {property.rentPrice.toLocaleString()}{" "}
            <span className="text-xs font-semibold text-[#2D3627]/70">
              / month
            </span>
          </p>
        </div>
      </CardHeader>

      {/* Main Parameters Content Body */}
      <CardContent className="p-4 pt-0 space-y-3 flex-1">
        {/* Stronger slate-olive text color mapping */}
        <div className="flex items-center gap-1.5 text-[#1C2317] text-sm font-bold">
          <MapPin className="h-4 w-4 text-[#2D3627] shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#2D3627]/80 font-semibold">
          <Maximize className="h-3.5 w-3.5 text-[#2D3627]/60" />
          <span>{property.areaInSqFt.toLocaleString()} Sq Ft total area</span>
        </div>

        {/* Truncated Amenities Subgrid (Displays top 3 to keep scaling proportional) */}
        <div className="flex flex-wrap gap-1 pt-1">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span
              key={amenity}
              className="text-[10px] bg-white/60 border border-olive-300/40 text-[#2D3627] px-2 py-0.5 rounded-md font-bold"
            >
              {amenity.replace("_", " ").toLowerCase()}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-[10px] text-[#2D3627] font-extrabold pl-1">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>
      </CardContent>

      {/* Action Footer Navigation Module */}
      <CardFooter className="p-4 pt-0 border-t border-olive-300/50 mt-2 bg-olive-300/30">
        <div className="w-full flex items-center justify-between gap-4 pt-3">
          <p className="text-[10px] text-[#2D3627] font-semibold truncate">
            By Landlord:{" "}
            <span className="text-black font-extrabold">
              {property.landlord.name}
            </span>
          </p>
          <Button
            asChild
            size="sm"
            className="bg-green-700 text-white hover:bg-green-800 text-xs font-bold shrink-0 cursor-pointer shadow-none"
          >
            <Link
              href={`/properties/${property.id}`}
              className="flex items-center gap-1"
            >
              View Details{" "}
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
