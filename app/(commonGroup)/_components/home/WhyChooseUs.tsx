"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Percent, Star, CheckCircle } from "lucide-react";

export function WhyChooseUs() {
  const valueProps = [
    {
      icon: <Percent className="h-6 w-6 text-green-600" />,
      title: "Direct Landlord Link",
      subtitle: "0% Broker Fees & No Middlemen",
      description:
        "Connect directly with property owners. By completely cutting out proxy agents, RentNest eliminates hidden fees and unnecessary matching overheads.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
      title: "Verified Profiles",
      subtitle: "AES-256 Encrypted Datastores",
      description:
        "Every user status is actively tracked. Landlord listings and tenant rental applications undergo strict verification to guarantee absolute security.",
    },
    {
      icon: <Star className="h-6 w-6 text-green-600" fill="currentColor" />,
      title: "Built-in Tenant Reviews",
      subtitle: "Structural Accountability",
      description:
        "Authentic, immutable star ratings and text feedback are tied directly to properties, helping you view honest rental history before applying.",
    },
  ];

  return (
    <section className="py-16 bg-white text-black border-b border-neutral-100">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-olive-200 text-black text-xs font-bold uppercase tracking-wider">
            Why RentNest
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black">
            A Transparent Rental Marketplace
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Engineered from the ground up to remove the frustration, high costs,
            and uncertainty from the Dhaka property rental process.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, idx) => (
            <Card
              key={idx}
              className="bg-olive-200 border border-olive-300 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <CardContent className="p-6 space-y-4 text-left">
                {/* Visual Accent Container */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-olive-300/40">
                    {prop.icon}
                  </div>
                  <Badge className="bg-green-600 text-white hover:bg-green-700 text-[9px] font-bold uppercase tracking-wider border-0">
                    Verified
                  </Badge>
                </div>

                {/* Typography Block */}
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-black tracking-tight flex items-center gap-2">
                    {prop.title}
                  </h3>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wide">
                    {prop.subtitle}
                  </p>
                </div>

                <p className="text-xs text-neutral-800 leading-relaxed font-semibold pt-1">
                  {prop.description}
                </p>
              </CardContent>

              {/* Bottom Card Footer Hint */}
              <div className="mx-6 pb-5 pt-3 border-t border-olive-300/60 flex items-center gap-1.5 text-[10px] text-neutral-700 font-bold">
                <CheckCircle className="h-3.5 w-3.5 text-green-600" /> RentNest
                Standard Approved
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
