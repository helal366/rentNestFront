"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserData } from "../../_types/users_types";
import { UserPropertyCard, UserReviewCard } from "./UserCard";

export function UserExpandedTabs({ user }: { user: UserData }) {
  return (
    <TableRow className="bg-muted/20 hover:bg-muted/20">
      <TableCell colSpan={5} className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-100 grid-cols-2">
            <TabsTrigger value="overview">
              Reviews ({user._count?.tenantReviews ?? 0})
            </TabsTrigger>
            <TabsTrigger value="properties">
              Properties ({user._count?.ownProperties ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            {user.tenantReviews.length === 0 ? (
              <p className="text-sm italic text-muted-foreground p-2">
                No active tenant reviews posted.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-h-87.5 overflow-y-auto p-1">
                {user.tenantReviews.map((review, idx) => (
                  <UserReviewCard key={idx} review={review} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="properties" className="mt-4 space-y-4">
            {user.ownProperties.length === 0 ? (
              <p className="text-sm italic text-muted-foreground p-2">
                No properties managed under this account.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-h-87.5 overflow-y-auto p-1">
                {user.ownProperties.map((prop, idx) => (
                  <UserPropertyCard key={idx} prop={prop} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </TableCell>
    </TableRow>
  );
}
