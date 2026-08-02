import { Info, MapPin, Home, Star } from "lucide-react";
import { getRentalRequests } from "../_actions/getRentalRequests";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import RentalRequestsTop from "../_components/rentalRequests/RentalRequestsTop";
import { RentalDetailsModal } from "../_components/rentalRequests/RentalRequestsDetailsModal";

export default async function RentalRequestsAdminPage() {
  const requests = await getRentalRequests();

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "default"; // solid background
      case "PENDING":
        return "secondary"; // neutral fallback
      case "REJECTED":
        return "destructive"; // red layout
      default:
        return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-full">
      <RentalRequestsTop />
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="text-lg font-semibold text-slate-800">
            All System Requests
          </CardTitle>
          <CardDescription>
            Total active records tracked: {requests.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {requests.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No system rental requests found.
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-45">Property info</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Landlord</TableHead>
                  <TableHead>Rent / month</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Request status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => {
                  const property = request.rentalRequestProperty;
                  return (
                    <TableRow key={request.id} className="hover:bg-slate-50/60">
                      {/* Property Sizing and Location */}
                      <TableCell className="font-medium text-slate-900">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5" />{" "}
                            {property.location}
                          </span>
                          <span className="text-sm font-semibold">
                            {property.areaInSqFt} SqFt
                          </span>
                        </div>
                      </TableCell>

                      {/* Category Tag */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-teal-50 text-teal-800 border-teal-200"
                        >
                          {property.category?.name || "Uncategorized"}
                        </Badge>
                      </TableCell>

                      {/* Landlord Contact Data */}
                      <TableCell>
                        <div className="flex flex-col text-xs">
                          <span className="font-medium text-slate-800">
                            {property.landlord?.name}
                          </span>
                          <span className="text-slate-400">
                            {property.landlord?.email}
                          </span>
                        </div>
                      </TableCell>

                      {/* Financials Breakdown */}
                      <TableCell>
                        <span className="font-bold text-slate-900 flex items-center text-sm">
                          TK {property.rentPrice.toLocaleString()}/=
                        </span>
                      </TableCell>

                      {/* Payment Status Check */}
                      <TableCell>
                        {request.isPaid ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100">
                            Paid
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-800 border-amber-200"
                          >
                            Unpaid
                          </Badge>
                        )}
                      </TableCell>

                      {/* Process Status Flag */}
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(request.requestStatus)}
                        >
                          {request.requestStatus}
                        </Badge>
                      </TableCell>

                      {/* Deep-dive Reviews Hover Component */}
                      <TableCell className="text-right">
                        <RentalDetailsModal request={request} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
