import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

import { Users, Calendar, Activity, Award } from "lucide-react";
import { useUpdateRoleRequestMutation } from "@/apiSlice/roleRequestApiSlice";
import { toast } from "sonner";
import { DashboardData, containerVariants } from "@/types/admin_interfaces";
import StatsCard from "../StatsCard";
import RoleRequestCard from "../RoleRequestCard";
import UsersTable from "../tables/UsersTable";
import { RoleRequest } from "@/types/core_interfaces";

interface OverviewTabProps {
  data: DashboardData;
  setActiveTab: (tab: string) => void;
}

export default function OverviewTab({ data, setActiveTab }: OverviewTabProps) {
  const {
    roleRequests,
    roleRequestsLoading,
    roleRequestsError,
    refetchRoleRequests,
    userData,
    userDataLoading,
    userDataError,
    refetchUsers,
    totalUsers,
    activeHackathons,
    teamCount,
    submissionCount,
  } = data;

  const [updateRoleRequest, { isLoading: isUpdatingRole }] =
    useUpdateRoleRequestMutation();

  // Stats cards with dynamic data
  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toString(),
      change: `+${Math.round(totalUsers * 0.1)}`,
      icon: Users,
    },
    {
      title: "Active Hackathons",
      value: activeHackathons.toString(),
      change: "+2",
      icon: Calendar,
    },
    {
      title: "Teams Registered",
      value: teamCount.toString(),
      change: `+${Math.round(teamCount * 0.08)}`,
      icon: Activity,
    },
    {
      title: "Submissions",
      value: submissionCount.toString(),
      change: `+${Math.round(submissionCount * 0.15)}%`,
      icon: Award,
    },
  ];

  // Handle role request actions
  const handleApproveRequest = async (id: string) => {
    try {
      await updateRoleRequest({
        id,
        status: "APPROVED",
        reviewNotes: "Request approved by admin",
      }).unwrap();

      toast.success("Role request approved", {
        description: "The user's role has been updated successfully.",
      });

      refetchRoleRequests();
    } catch (err) {
      toast.error("Failed to approve request", {
        description: "An error occurred. Please try again.",
      });
    }
  };

  const handleRejectRequest = async (id: string) => {
    try {
      await updateRoleRequest({
        id,
        status: "REJECTED",
        reviewNotes: "Request rejected by admin",
      }).unwrap();

      toast.error("Role request rejected", {
        description: "The user has been notified of the decision.",
      });

      refetchRoleRequests();
    } catch (err) {
      toast.error("Failed to reject request", {
        description: "An error occurred. Please try again.",
      });
    }
  };

  const pendingRequests = roleRequests.filter(
    (req) => req.status === "PENDING"
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
      >
        {stats.map((stat, index) =>
          stat && stat.title && stat.value && stat.change && stat.icon ? (
            <StatsCard
              key={stat.title}
              title={stat.title || "title"}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              index={index}
            />
          ) : null
        )}
      </motion.div>

      {/* Recent Activity & Role Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="shadow-lg h-full border-0">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Recent Users</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[var(--primary-10)]"
                  onClick={() => setActiveTab("users")}
                >
                  See all
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <UsersTable
                users={userData?.users?.slice(0, 5) || []}
                loading={userDataLoading}
                error={userDataError}
                retry={() => refetchUsers()}
                minimal
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Role Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="shadow-lg h-full border-0">
            <CardHeader className="pb-2">
              <CardTitle>Pending Role Requests</CardTitle>
              <p className="text-sm text-[var(--muted-foreground)]">
                Approve or reject role requests
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {roleRequestsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="h-8 w-8 rounded-full border-4 border-t-transparent border-[var(--primary-9)] animate-spin"></div>
                </div>
              ) : roleRequestsError ? (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-center">
                  <p>Failed to load role requests</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => refetchRoleRequests()}
                  >
                    Retry
                  </Button>
                </div>
              ) : !pendingRequests.length ? (
                <div className="p-4 rounded-lg bg-[var(--primary-2)] border border-[var(--primary-6)] text-center">
                  <p className="text-[var(--muted-foreground)]">
                    No pending role requests
                  </p>
                </div>
              ) : (
                pendingRequests
                  .slice(0, 3)
                  .map((request) => (
                    <RoleRequestCard
                      key={request.id}
                      request={request}
                      onApprove={handleApproveRequest}
                      onReject={handleRejectRequest}
                    />
                  ))
              )}
              <Button
                variant="ghost"
                className="w-full text-[var(--primary-10)]"
                onClick={() => setActiveTab("requests")}
              >
                View all requests
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
