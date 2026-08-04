"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ShieldCheck, Users, Building } from "lucide-react";

export function HeroRightVisual() {
  return (
    <div className="lg:col-span-5 relative flex justify-center items-center lg:pl-4">
      {/* Ambient Olive Background Blur Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3E4A36]/10 rounded-full blur-[70px] pointer-events-none" />

      {/* Main Premium Dark Visual Frame Box */}
      <div className="relative w-full max-w-95 aspect-4/5 bg-neutral-900 text-white rounded-2xl shadow-2xl p-5 flex flex-col justify-between overflow-hidden border border-neutral-800">
        <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#3E4A36]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Live Indicator Card Header */}
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#3E4A36] animate-pulse" />
              <span className="text-[9px] tracking-widest uppercase font-bold text-neutral-400">
                Core Engine
              </span>
            </div>
            <Link
              href="/properties"
              className="text-[9px] text-neutral-400 hover:text-white flex items-center gap-0.5 transition-colors group"
            >
              Live Board{" "}
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-0.5">
            <p className="text-[10px] text-neutral-400">Active Listing Focus</p>
            <h3 className="text-lg font-bold text-white tracking-tight">
              1,250 Sq Ft Apartment
            </h3>
            <p className="text-[11px] text-[#3E4A36] font-bold">
              Jatrabari Zone • Available
            </p>
          </div>
        </div>

        {/* Inner Floating Status Overlay Badges */}
        <div className="space-y-2.5 my-auto relative z-10">
          <Card className="bg-neutral-800/80 border-neutral-700/50 backdrop-blur-sm shadow-xl text-white transform -translate-x-2">
            <CardContent className="p-2.5 flex items-center gap-3">
              <div className="p-1.5 bg-[#3E4A36] rounded-md text-white">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-wide uppercase text-[#3E4A36]">
                  Secured Application
                </p>
                <p className="text-xs font-medium text-neutral-300">
                  Tenant request verified cleanly
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800/80 border-neutral-700/50 backdrop-blur-sm shadow-xl text-white transform translate-x-2">
            <CardContent className="p-2.5 flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-md text-black">
                <Users className="h-3.5 w-3.5" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-wide uppercase text-neutral-400">
                  Direct Landlord Link
                </p>
                <p className="text-xs font-medium text-neutral-300">
                  No intermediary broker match
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Metadata Sheet Guard */}
        <div className="border-t border-neutral-800 pt-3 mt-auto flex items-center justify-between text-left relative z-10 text-xs">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-neutral-800 rounded-md text-neutral-400">
              <Building className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[9px] text-neutral-400 font-medium leading-none">
                Target
              </p>
              <p className="font-bold text-white mt-0.5">Residential</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-neutral-400 font-medium leading-none">
              Security
            </p>
            <p className="font-bold text-green-400 mt-0.5">AES-256</p>
          </div>
        </div>
      </div>
    </div>
  );
}
