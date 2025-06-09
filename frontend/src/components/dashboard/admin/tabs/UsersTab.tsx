import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { DashboardData } from "@/types/admin_interfaces";
import UsersTable from "../tables/UsersTable";

interface UsersTabProps {
  data: DashboardData;
}

export default function UsersTab({ data }: UsersTabProps) {
  const {
    userData,
    userDataLoading,
    userDataError,
    refetchUsers,
    searchQuery,
    setSearchQuery,
  } = data;

  // Filter users based on search query
  const filteredUsers =
    userData?.users?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>User Management</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <UsersTable
          users={filteredUsers}
          loading={userDataLoading}
          error={userDataError}
          retry={() => refetchUsers()}
        />
      </CardContent>
    </Card>
  );
}
