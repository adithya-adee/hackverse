"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcw, Search, Plus, Loader2, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OverviewTab } from "@/components/dashboard/organiser/overview/OverviewTab";
import { HackathonTab } from "@/components/dashboard/organiser/hackathons/HackahtonTab";
import { TeamsTab } from "@/components/dashboard/organiser/teams/TeamsTab";
import { SubmissionsTab } from "@/components/dashboard/organiser/submissions/SubmissionsTab";
import { ParticipantsTab } from "@/components/dashboard/organiser/participants/ParticipantsTab";
// TODO: Implement setting tab
// import { SettingsTab } from "@/components/dashboard/organiser/settings/SettingsTab";
import Loading from "@/app/loading";

import {
  useGetHackathonsByOrganizerQuery,
  useGetTeamsByOrganizerQuery,
  useGetSubmissionsByOrganizerQuery,
  useGetParticipantsByOrganizerQuery,
} from "@/apiSlice/userApiSlice";
import { Hackathon } from "@/types/core_interfaces";

export default function OrganizerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use the real API hooks instead of mock implementations
  const {
    data: hackathonData = [],
    isLoading: hackathonLoading,
    error: hackathonError,
    refetch: refetchHackathons,
  } = useGetHackathonsByOrganizerQuery(undefined);

  const {
    data: teamsData = [],
    isLoading: teamsLoading,
    error: teamsError,
    refetch: refetchTeams,
  } = useGetTeamsByOrganizerQuery(undefined);

  const {
    data: submissionsData = [],
    isLoading: submissionsLoading,
    error: submissionsError,
    refetch: refetchSubmissions,
  } = useGetSubmissionsByOrganizerQuery(undefined);

  const {
    data: participantsData = [],
    isLoading: participantsLoading,
    error: participantsError,
    refetch: refetchParticipants,
  } = useGetParticipantsByOrganizerQuery(undefined);

  const filteredHackathons = useMemo(() => {
    if (!searchQuery.trim()) return hackathonData;
    return hackathonData?.filter(
      (hackathon: Hackathon) =>
        hackathon.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [hackathonData, searchQuery]);

  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) return teamsData;
    return teamsData?.filter((team: any) =>
      team.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teamsData, searchQuery]);

  const filteredSubmissions = useMemo(() => {
    if (!searchQuery.trim()) return submissionsData;
    return submissionsData?.filter(
      (submission: any) =>
        submission.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [submissionsData, searchQuery]);

  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return participantsData;
    return participantsData?.filter(
      (participant: any) =>
        participant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [participantsData, searchQuery]);

  // Dashboard refreshing
  const refreshDashboard = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchHackathons(),
        refetchTeams(),
        refetchSubmissions(),
        refetchParticipants(),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Check if anything is loading
  const isLoading =
    hackathonLoading ||
    teamsLoading ||
    submissionsLoading ||
    participantsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary-5)] via-[var(--primary-3)] to-[var(--primary-1)]">
        <Loading />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-2)] p-6"
    >
      <div className="mt-8 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary-12)]">
                Organiser Dashboard
              </h1>
              <p className="text-[var(--primary-11)]">
                Manage your hackathons, teams, and submissions
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => router.push("/host-hackathon/step1")}
                className="bg-[var(--primary-9)] text-[var(--primary-1)] hover:bg-[var(--primary-5)] transition duration-200 ease-out"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Hackathon
              </Button>
              <Button
                onClick={refreshDashboard}
                disabled={isRefreshing}
                variant="outline"
                className="border-[var(--primary-7)] hover:bg-[var(--primary-4)] transition duration-200 ease-out"
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4 mr-2" />
                )}
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </div>

          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons, teams, or submissions..."
              className="pl-10 bg-[var(--primary-1)] border-[var(--primary-7)] focus:border-[var(--primary-8)]"
            />
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-6 gap-2 h-auto p-1 w-full max-w-5xl mx-auto">
            <TabsTrigger
              value="overview"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="hackathons"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              Hackathons
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              Teams
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              Submissions
            </TabsTrigger>
            <TabsTrigger
              value="participants"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              Participants
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab
              hackathonData={hackathonData}
              teamsData={teamsData}
              submissionsData={submissionsData}
              participantsData={participantsData}
              setActiveTab={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="hackathons">
            <HackathonTab
              filteredHackathons={filteredHackathons}
              teamsData={teamsData}
              hackathonLoading={hackathonLoading}
              hackathonError={hackathonError}
              refetchHackathons={refetchHackathons}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="teams">
            <TeamsTab
              filteredTeams={filteredTeams}
              teamsLoading={teamsLoading}
              teamsError={teamsError}
              refetchTeams={refetchTeams}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="submissions">
            <SubmissionsTab
              filteredSubmissions={filteredSubmissions}
              submissionsLoading={submissionsLoading}
              submissionsError={submissionsError}
              refetchSubmissions={refetchSubmissions}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="participants">
            <ParticipantsTab
              filteredParticipants={filteredParticipants}
              participantsLoading={participantsLoading}
              participantsError={participantsError}
              refetchParticipants={refetchParticipants}
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="settings">
            <div>Not yet implemented</div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
