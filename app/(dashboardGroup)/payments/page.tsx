import Link from "next/link";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAllPaymentsAction } from "@/app/(dashboardGroup)/_actions/fetchPayments";

export const revalidate = 0;

export default async function PaymentsPage() {
  const payments = await fetchAllPaymentsAction();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Payments History
          </h1>
          <p className="text-muted-foreground">
            Monitor and track incoming and outgoing property rental
            transactions.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions Log</CardTitle>
          <CardDescription>
            A comprehensive list of statement items generated via payment
            gateways.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Property & Category</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Landlord</TableHead>
                  <TableHead>Amount (BDT)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No payment records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <td className="font-mono text-xs max-w-30 truncate p-4">
                        {payment.transactionId}
                      </td>
                      <TableCell>
                        <div className="font-medium">
                          {payment.rentalRequest?.rentalRequestProperty
                            ?.location || "Unknown"}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {payment.rentalRequest?.rentalRequestProperty
                            ?.category?.name || "Property"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {payment.tenant?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {payment.tenant?.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {payment.landlord?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {payment.landlord?.email}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ৳{payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.paymentStatus === "VALID"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            payment.paymentStatus === "VALID"
                              ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                              : ""
                          }
                        >
                          {payment.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(
                          new Date(payment.paidAt),
                          "dd MMM yyyy, hh:mm a",
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/payments/${payment.id}`} passHref>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
