import { CreditCard } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentItemSingle } from "../../_types/rental_landlord_tenant_types";

export function TransactionLedgerCard({
  payments,
}: {
  payments: PaymentItemSingle[];
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <CardTitle>Transaction & Ledger Logs</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground">
            No payment transactions matched to this request.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-xs">
                    {p.provider}
                  </TableCell>
                  <TableCell className="text-xs">{p.method}</TableCell>
                  <TableCell className="text-xs">
                    {new Date(p.paidAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold ${p.paymentStatus === "COMPLETED" ? "text-green-600" : "text-amber-600"}`}
                    >
                      {p.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-xs text-primary">
                    ৳{p.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
