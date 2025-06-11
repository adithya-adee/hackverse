import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { DashboardData } from "@/types/admin_interfaces";
import RoleRequestsTable from "../tables/RoleRequestTable";

interface RequestsTabProps {
  data: DashboardData;
}

export default function RequestsTab({ data }: RequestsTabProps) {
  const {
    roleRequests,
    roleRequestsLoading,
    roleRequestsError,
    refetchRoleRequests,
  } = data;
  const [requestSearchQuery, setRequestSearchQuery] = useState("");

  const filteredRequests = roleRequests.filter(
    (request) =>
      request.User?.name
        ?.toLowerCase()
        .includes(requestSearchQuery.toLowerCase()) ||
      request.User?.email
        ?.toLowerCase()
        .includes(requestSearchQuery.toLowerCase()) ||
      request.Role?.name
        ?.toLowerCase()
        .includes(requestSearchQuery.toLowerCase())
  );

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Role Requests</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-9 w-64"
                value={requestSearchQuery}
                onChange={(e) => setRequestSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RoleRequestsTable
          requests={filteredRequests}
          loading={roleRequestsLoading}
          error={roleRequestsError}
          retry={() => refetchRoleRequests()}
        />
      </CardContent>
    </Card>
  );
}
