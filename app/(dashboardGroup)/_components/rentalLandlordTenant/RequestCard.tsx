import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RequestCardProps {
  req: {
    id: string;
    tenantId: string;
    requestStatus: string;
    isPaid: boolean;
    createdAt: string;
  };
  userRole?: string;
}

export function RequestCard({ req, userRole }: RequestCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-600 text-white hover:bg-green-600";
      case "REJECTED":
        return "bg-destructive text-destructive-foreground hover:bg-destructive";
      default:
        return "bg-amber-500 text-white hover:bg-amber-500";
    }
  };

  return (
    <Card className="flex flex-col justify-between border bg-olive-300 shadow-xs hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground block">
              Tenant Reference
            </span>
            <CardTitle className="text-sm font-mono text-foreground/90">
              ID: {req.tenantId.slice(0, 8)}...
            </CardTitle>
          </div>
          <Badge
            className={`${getStatusColor(req.requestStatus)} text-[11px] px-2 py-0.5`}
          >
            {req.requestStatus}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <div className="border-t pt-3 space-y-1.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Payment Status:</span>
            <span>
              {req.isPaid ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600 bg-green-50 px-1.5 py-0"
                >
                  Paid
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-amber-600 border-amber-600 bg-amber-50 px-1.5 py-0"
                >
                  Unpaid
                </Badge>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Submitted:</span>
            <span className="text-muted-foreground/90 font-medium">
              {new Date(req.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="pb-2 pt-2 space-y-2 border-t bg-secondary/10 mt-2 p-2 rounded-lg">
          <Button
            asChild
            className="w-full bg-green-200 text-black hover:bg-green-300"
            size="sm"
          >
            <Link href={`/rental_landlord_tenant/${req.id}`}>View Details</Link>
          </Button>

          {userRole === "LANDLORD" && req.requestStatus === "PENDING" && (
            <Button
              asChild
              className="w-full bg-olive-200 text-black hover:bg-olive-300"
              size="sm"
            >
              <Link href={`/rental_landlord_tenant/${req.id}`}>
                Approve Now
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
