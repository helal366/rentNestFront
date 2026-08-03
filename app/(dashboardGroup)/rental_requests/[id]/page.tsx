import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getRentalRequestByIdAction } from "../../_actions/fetch_landlord_tenant_rentals";
import { PropertyInsightsCard } from "../../_components/rentalLandlordTenant/PropertyInsightsCard";
import { TransactionLedgerCard } from "../../_components/rentalLandlordTenant/TransactionLedgerCard";
import { UserProfileCard } from "../../_components/rentalLandlordTenant/UserProfileCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RentalRequestDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getRentalRequestByIdAction(id);

  if (!data || !data.rentalRequest) {
    notFound();
  }

  const request = data.rentalRequest;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-600 text-white";
      case "REJECTED":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-amber-500 text-white";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl space-y-6">
      <Button asChild variant="ghost" size="sm" className="gap-2">
        <Link href="/rental_requests">
          <ArrowLeft className="h-4 w-4" /> Back to List
        </Link>
      </Button>

      {/* Main Request Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
            Request ID: {request.id}
          </span>
          <h1 className="text-3xl font-bold mt-1">Rental Detail Dashboard</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Submitted on: {new Date(request.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            className={`text-sm px-3 py-1 ${getStatusColor(request.requestStatus)}`}
          >
            Request: {request.requestStatus}
          </Badge>
          <Badge
            variant={request.isPaid ? "default" : "destructive"}
            className="text-sm px-3 py-1"
          >
            {request.isPaid ? "Paid Processing" : "Payment Pending"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left/Middle Column - Property Details & Payment History */}
        <div className="md:col-span-2 space-y-6">
          <PropertyInsightsCard property={request.rentalRequestProperty} />
          <TransactionLedgerCard payments={request.payments} />
        </div>

        {/* Right Column - User Overview Profiles */}
        <div className="space-y-6">
          <UserProfileCard
            title="Tenant Target Profile"
            user={request.tenant}
          />
          <UserProfileCard
            title="Landlord Target Profile"
            user={request.landlord}
          />
        </div>
      </div>
    </div>
  );
}
