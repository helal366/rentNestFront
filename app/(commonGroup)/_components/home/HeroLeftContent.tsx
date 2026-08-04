"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { HeroSearchForm } from "./HeroSearchForm";

export function HeroLeftContent() {
  return (
    <div className="lg:col-span-7 space-y-6 text-center lg:text-left bg-olive-300 p-6 rounded-2xl border border-neutral-100 shadow-sm">
      {/* Informative Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive-200/50 border border-olive-300">
        <Badge
          variant="default"
          className="bg-green-600 text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider hover:bg-green-700"
        >
          New Engine
        </Badge>
        <span className="text-xs font-semibold text-green-700 tracking-tight">
          Secure property matchmaking active
        </span>
      </div>

      {/* Main Copywriting Typography - Capped at 2xl/3xl */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-snug">
          Find Your Perfect Nest, <br className="hidden sm:inline" />
          Managed with <span className="text-green-700">Precision</span>.
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto lg:mx-0 leading-relaxed">
          RentNest connects verified landlords with trusted tenants. Zero hidden
          fees. Built-in rental requests. Complete transaction clarity.
        </p>
      </div>

      {/* Integrated Action Search bar */}
      <div className="bg-olive-200 p-2 rounded-xl border border-olive-200">
        <HeroSearchForm />
      </div>

      {/* Corporate Value Metrics Row */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-4 border-t border-olive-300">
        <div className="bg-olive-200/40 p-2 rounded-lg text-center border border-olive-200">
          <p className="text-xl font-extrabold text-neutral-900 tracking-tight">
            2K+
          </p>
          <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">
            Verified Nests
          </p>
        </div>
        <div className="bg-olive-200 p-2 rounded-lg text-center border border-olive-300">
          <p className="text-xl font-extrabold text-green-700 tracking-tight">
            98%
          </p>
          <p className="text-[10px] text-neutral-900 font-bold uppercase tracking-wider">
            Match Success
          </p>
        </div>
        <div className="bg-olive-200/40 p-2 rounded-lg text-center border border-olive-200">
          <p className="text-xl font-extrabold text-neutral-900 tracking-tight">
            0%
          </p>
          <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
            Broker Fees
          </p>
        </div>
      </div>
    </div>
  );
}
