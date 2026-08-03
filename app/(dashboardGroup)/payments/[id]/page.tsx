import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fetchPaymentByIdAction } from "@/app/(dashboardGroup)/_actions/fetchPayments";

interface PaymentDetailsPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function PaymentDetailsPage({
  params,
}: PaymentDetailsPageProps) {
  const { id } = await params;
  const payment = await fetchPaymentByIdAction(id);

  if (!payment) {
    notFound();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/payments"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to Payments
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mt-2">
            Receipt Overview
          </h1>
        </div>
        <Badge
          variant={
            payment.paymentStatus === "VALID" ? "default" : "destructive"
          }
          className={
            payment.paymentStatus === "VALID"
              ? "bg-emerald-600 text-base px-4 py-1 hover:bg-emerald-600"
              : "text-base px-4 py-1"
          }
        >
          {payment.paymentStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Transaction Parameters */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Parameters</CardTitle>
            <CardDescription>
              Core checkout session markers managed via global processors.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-muted-foreground block">
                  Transaction ID
                </span>
                <span className="font-mono text-sm font-semibold">
                  {payment.transactionId}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">
                  Settled Amount
                </span>
                <span className="text-lg font-bold text-primary">
                  ৳{payment.amount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">
                  Payment Gateway
                </span>
                <span className="text-sm font-medium">
                  {payment.provider} ({payment.method})
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">
                  Execution Timestamp
                </span>
                <span className="text-sm font-medium">
                  {format(new Date(payment.paidAt), "dd MMM yyyy, hh:mm:ss a")}
                </span>
              </div>
            </div>

            <Separator className="my-2" />

            <div>
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                SSLCommerz Validation Meta
              </h4>
              <div className="grid grid-cols-2 gap-4 bg-muted/50 p-3 rounded-lg border text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">
                    Session ID
                  </span>
                  <span className="truncate block">{payment.sslSessionId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">
                    Validation ID
                  </span>
                  <span>{payment.sslValidationId || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">
                    Card/Channel Brand
                  </span>
                  <span>{payment.sslCardType || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase">
                    Gateway Risk Title
                  </span>
                  <span
                    className={
                      payment.sslRiskTitle === "Safe"
                        ? "text-emerald-600 font-bold"
                        : ""
                    }
                  >
                    {payment.sslRiskTitle || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Context References Group */}
        <div className="space-y-6">
          {/* Associated Property */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Target Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="font-bold text-base">
                {payment.rentalRequest?.rentalRequestProperty?.location ||
                  "N/A"}
              </div>
              <div className="text-muted-foreground capitalize text-xs">
                Category:{" "}
                {payment.rentalRequest?.rentalRequestProperty?.category?.name ||
                  "N/A"}
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                Area:{" "}
                {payment.rentalRequest?.rentalRequestProperty?.areaInSqFt || 0}{" "}
                Sq Ft
              </div>
              <div className="mt-3 text-xs font-medium bg-secondary px-2 py-1 rounded inline-block">
                Base Rent: ৳
                {payment.rentalRequest?.rentalRequestProperty?.rentPrice?.toLocaleString()}
                /mo
              </div>
            </CardContent>
          </Card>

          {/* Involved Actors */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Involved Parties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="font-semibold block text-[10px] text-muted-foreground uppercase">
                  Tenant (Payer)
                </span>
                <div className="font-medium text-sm">
                  {payment.tenant?.name}
                </div>
                <div className="text-muted-foreground">
                  {payment.tenant?.email}
                </div>
                <div className="text-muted-foreground text-[11px] mt-0.5">
                  Contact: {payment.tenant?.contactNo || "N/A"}
                </div>
              </div>
              <Separator />
              <div>
                <span className="font-semibold block text-[10px] text-muted-foreground uppercase">
                  Landlord (Recipient)
                </span>
                <div className="font-medium text-sm">
                  {payment.landlord?.name}
                </div>
                <div className="text-muted-foreground">
                  {payment.landlord?.email}
                </div>
                <div className="text-muted-foreground text-[11px] mt-0.5">
                  Contact: {payment.landlord?.contactNo || "N/A"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
