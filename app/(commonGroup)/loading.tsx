import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64 md:w-80" />
          <Skeleton className="h-4 w-48 md:w-60" />
        </div>
        <Skeleton className="h-7 w-24 hidden sm:block rounded-full" />
      </div>

      {/* Grid Grid Items Skeleton Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between border rounded-lg overflow-hidden p-6 space-y-4"
          >
            {/* Category and Status Badge Rows */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-16 rounded" />
              <Skeleton className="h-5 w-20 rounded" />
            </div>

            {/* Title / Location Header */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>

            {/* Pricing Section Block */}
            <div className="py-2">
              <Skeleton className="h-8 w-28" />
            </div>

            {/* Amenities Badges Row */}
            <div className="flex flex-wrap gap-2 pt-1">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Bottom Form Action Button Row */}
            <div className="pt-4 border-t flex gap-2">
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
