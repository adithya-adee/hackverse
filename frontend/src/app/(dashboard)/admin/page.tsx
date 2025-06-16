"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  Settings,
} from "lucide-react";

import { useGetRoleRequestQuery } from "@/apiSlice/roleRequestApiSlice";
import {
  useGetAllHackathonsQuery,
  useGetAllUsersQuery,
  useGetAllTeamsQuery,
  useGetAllSubmissionsQuery,
} from "@/apiSlice/adminApiSlice";

import DashboardHeader from "@/components/dashboard/admin/DashboardHeader";
import OverviewTab from "@/components/dashboard/admin/tabs/OverviewTab";
import UsersTab from "@/components/dashboard/admin/tabs/UsersTab";
import HackathonsTab from "@/components/dashboard/admin/tabs/HackathonsTab";
import RequestsTab from "@/components/dashboard/admin/tabs/RequestsTab";
import SettingsTab from "@/components/dashboard/admin/tabs/SettingsTab";
import { Hackathon } from "@/types/core_interfaces";
import { HackathonStatus } from "@/types/core_enum";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all API data
  const {
    data: roleRequests = [],
    isLoading: roleRequestsLoading,
    error: roleRequestsError,
    refetch: refetchRoleRequests,
  } = useGetRoleRequestQuery(undefined);

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
    refetch: refetchUsers,
  } = useGetAllUsersQuery(undefined);

  const {
    data: hackathonData,
    isLoading: hackathonLoading,
    error: hackathonError,
    refetch: refetchHackathons,
  } = useGetAllHackathonsQuery(undefined);

  const {
    data: teamsData,
    isLoading: teamsLoading,
    error: teamsError,
    refetch: refetchTeams,
  } = useGetAllTeamsQuery(undefined);

  const {
    data: submissionsData,
    isLoading: submissionsLoading,
    error: submissionsError,
    refetch: refetchSubmissions,
  } = useGetAllSubmissionsQuery(undefined);

  const userCount = userData?.users?.length || 0;
  const totalUsers = userData?.count || 0;
  const activeHackathons =
    hackathonData?.response?.filter(
      (h: Hackathon) => h.status === HackathonStatus.UPCOMING
    ).length || 0;

  const hackathonCount = hackathonData?.count || 0;
  const teamCount = teamsData || 0;
  const submissionCount = submissionsData || 0;

  // Dashboard refreshing
  const refreshDashboard = () => {
    refetchUsers();
    refetchHackathons();
    refetchRoleRequests();
    refetchTeams();
    refetchSubmissions();
  };

  const dashboardData = {
    roleRequests,
    roleRequestsLoading,
    roleRequestsError,
    refetchRoleRequests,
    userData,
    userDataLoading,
    userDataError,
    refetchUsers,
    hackathonData,
    hackathonLoading,
    hackathonError,
    refetchHackathons,
    teamsData,
    teamsLoading,
    teamsError,
    refetchTeams,
    submissionsData,
    submissionsLoading,
    submissionsError,
    refetchSubmissions,
    totalUsers,
    activeHackathons,
    hackathonCount,
    teamCount,
    submissionCount,
    searchQuery,
    setSearchQuery,
    refreshDashboard,
  };
  // console.log(dashboardData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-2)] p-6"
    >
      <div className="max-w-7xl mx-auto">
        <DashboardHeader refreshDashboard={refreshDashboard} />

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-5 gap-2 h-auto p-1 w-full max-w-4xl mx-auto">
            <TabsTrigger
              value="overview"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="hackathons"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Hackathons
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Requests
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab data={dashboardData} setActiveTab={setActiveTab} />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab data={dashboardData} />
          </TabsContent>

          <TabsContent value="hackathons">
            <HackathonsTab data={dashboardData} />
          </TabsContent>

          <TabsContent value="requests">
            <RequestsTab data={dashboardData} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
