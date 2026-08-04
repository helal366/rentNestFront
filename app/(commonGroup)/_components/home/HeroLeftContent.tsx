"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { HeroSearchForm } from "./HeroSearchForm";

export function HeroLeftContent() {
  return (
    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
      {/* Informative Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3E4A36]/10 border border-[#3E4A36]/20">
        <Badge
          variant="default"
          className="bg-[#3E4A36] text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider"
        >
          New Engine
        </Badge>
        <span className="text-xs font-semibold text-[#3E4A36] tracking-tight">
          Secure property matchmaking active
        </span>
      </div>

      {/* Main Copywriting Typography */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.1]">
          Find Your Perfect Nest, <br className="hidden sm:inline" />
          Managed with <span className="text-[#3E4A36]">Precision</span>.
        </h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
          RentNest connects verified landlords with trusted tenants. Zero hidden
          fees. Built-in rental requests. Complete transaction clarity.
        </p>
      </div>

      {/* Integrated Action Search bar */}
      <HeroSearchForm />

      {/* Corporate Value Metrics Row */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-4 border-t border-neutral-100">
        <div>
          <p className="text-2xl font-extrabold text-black tracking-tight">
            2K+
          </p>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
            Verified Nests
          </p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-[#3E4A36] tracking-tight">
            98%
          </p>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
            Match Success
          </p>
        </div>
        <div>
          <p className="text-2xl font-extrabold text-black tracking-tight">
            0%
          </p>
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
            Broker Fees
          </p>
        </div>
      </div>
    </div>
  );
}
