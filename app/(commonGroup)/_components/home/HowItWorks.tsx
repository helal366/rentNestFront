"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MousePointerClick,
  CreditCard,
  PlusCircle,
  FileEdit,
  Trash2,
  User,
  Building,
} from "lucide-react";

export function HowItWorks() {
  const tenantSteps = [
    {
      icon: <Search className="h-5 w-5 text-green-600" />,
      title: "1. Browse Nests",
      description:
        "Explore verified, live residential listings and use micro-filters to match your desired Dhaka zone.",
    },
    {
      icon: <MousePointerClick className="h-5 w-5 text-green-600" />,
      title: "2. One-Click Request",
      description:
        "Submit your tenant profile variables directly to the landlord instantly without proxy agent interaction.",
    },
    {
      icon: <CreditCard className="h-5 w-5 text-green-600" />,
      title: "3. Secure Lease & Pay",
      description:
        "Once authorized by the landlord, finalize your rent ledger using secure platform workflows.",
    },
  ];

  const landlordSteps = [
    {
      icon: <PlusCircle className="h-5 w-5 text-green-600" />,
      title: "1. Create Listings",
      description:
        "Upload detailed property specifications, rent prices, zones, and available amenities instantly.",
    },
    {
      icon: <FileEdit className="h-5 w-5 text-green-600" />,
      title: "2. Manage & Update",
      description:
        "Review real-time applicant profiles, modify asset parameters, or update dynamic listing details easily.",
    },
    {
      icon: <Trash2 className="h-5 w-5 text-green-600" />,
      title: "3. Conclude or Delete",
      description:
        "Approve a tenant to collect rent, or safely delete inactive or outdated property records anytime.",
    },
  ];

  return (
    <section className="py-16 bg-white text-black border-b border-neutral-100">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading Group */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-olive-200 text-black text-xs font-bold uppercase tracking-wider">
            Platform Engine Walkthrough
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black">
            How RentNest Operates
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our dual-stream framework isolates tenant operations from asset
            management matrices to keep actions transparent.
          </p>
        </div>

        {/* Dual Track Grid Wrapper */}
        <div className="space-y-12">
          {/* TRACK 1: FOR TENANTS */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-olive-300 pb-2">
              <div className="p-1.5 bg-olive-200 rounded-lg text-black">
                <User className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-black tracking-tight">
                The Tenant Pathway
              </h3>
              <Badge className="bg-green-600 text-white hover:bg-green-700 text-[10px] font-bold border-0">
                Leasing Stream
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tenantSteps.map((step, idx) => (
                <Card
                  key={idx}
                  className="bg-olive-200 border border-olive-300 shadow-sm transition-all duration-200"
                >
                  <CardContent className="p-5 space-y-3 text-left">
                    <div className="p-2 bg-white rounded-lg w-fit">
                      {step.icon}
                    </div>
                    <h4 className="text-sm font-extrabold text-black tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs text-neutral-800 leading-relaxed font-semibold">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* TRACK 2: FOR LANDLORDS */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-olive-300 pb-2">
              <div className="p-1.5 bg-[#3E4A36] rounded-lg text-white">
                <Building className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-bold text-black tracking-tight">
                The Landlord Workspace
              </h3>
              <Badge className="bg-green-600 text-white hover:bg-green-700 text-[10px] font-bold border-0">
                Asset Control Lifecycle
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {landlordSteps.map((step, idx) => (
                <Card
                  key={idx}
                  className="bg-olive-200 border border-olive-300 shadow-sm transition-all duration-200"
                >
                  <CardContent className="p-5 space-y-3 text-left">
                    <div className="p-2 bg-white rounded-lg w-fit">
                      {step.icon}
                    </div>
                    <h4 className="text-sm font-extrabold text-black tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs text-neutral-800 leading-relaxed font-semibold">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
