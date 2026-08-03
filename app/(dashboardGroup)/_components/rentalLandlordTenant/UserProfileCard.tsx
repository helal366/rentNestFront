import { User, ShieldCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserDetailSingle } from "../../_types/rental_landlord_tenant_types";

interface UserProfileCardProps {
  title: string;
  user: UserDetailSingle;
}

export function UserProfileCard({ title, user }: UserProfileCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="h-4 w-4" />
          <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div>
          <span className="text-muted-foreground">Name:</span>{" "}
          <p className="font-medium text-sm text-foreground">{user.name}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Email:</span>{" "}
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Contact Number:</span>{" "}
          <p className="font-medium">{user.contactNo}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Physical Address:</span>{" "}
          <p className="font-medium text-muted-foreground">{user.address}</p>
        </div>
        <div className="pt-1">
          {user.userStatus === "UNBAN" ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
              <ShieldCheck className="h-3 w-3" /> Active User Account
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-destructive bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20">
              <AlertTriangle className="h-3 w-3" /> Account Restricted
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
