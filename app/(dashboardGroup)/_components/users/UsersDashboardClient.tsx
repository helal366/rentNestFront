"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserData } from "../../_types/users_types";
import { UserExpandedTabs } from "./UserExpandedTabs";

interface UsersDashboardClientProps {
  initialUsers: UserData[];
  initialTotal: number;
}

export default function UsersDashboardClient({ initialUsers, initialTotal }: UsersDashboardClientProps) {
  const [users] = useState<UserData[]>(initialUsers);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">System Users Management</h1>
          <p className="text-sm text-muted-foreground">Review platform users, landlord properties, and tenant activities.</p>
        </div>
        <Card className="min-w-45">
          <CardHeader className="p-4 pb-1">
            <CardDescription className="text-xs uppercase tracking-wider font-semibold">Total System Users</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-3xl font-bold">{initialTotal}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Details</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const isExpanded = expandedUser === user.id;
              return (
                <React.Fragment key={user.id}>
                  <TableRow className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-semibold text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "ADMIN" ? "destructive" : user.role === "LANDLORD" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={user.userStatus === "BANNED" ? "border-destructive text-destructive bg-destructive/5" : "border-emerald-500 text-emerald-600 bg-emerald-50"}>
                        {user.userStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground">{user.contactNo}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-45">{user.address}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setExpandedUser(isExpanded ? null : user.id)}>
                        {isExpanded ? "Hide Details" : "View Details"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {isExpanded && <UserExpandedTabs user={user} />}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
