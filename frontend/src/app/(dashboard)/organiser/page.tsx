"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Fixed import
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  Trophy,
  Search,
  Plus,
  RefreshCcw,
  Clock,
  CheckCircle,
  X,
  DollarSign,
  Award,
  ChevronRight,
  Filter,
  Loader2,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Hackathon, Team, Submission } from "@/types/core_interfaces";

// Dashboard Page Component with all inline components
export default function OrganizerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Custom hooks to fetch data - using mocked implementations for now
  const {
    data: hackathonData = [],
    isLoading: hackathonLoading,
    error: hackathonError,
    refetch: refetchHackathons,
  } = useGetHackathonsByOrganizerQuery();

  const {
    data: teamsData = [],
    isLoading: teamsLoading,
    error: teamsError,
    refetch: refetchTeams,
  } = useGetTeamsByOrganizerQuery();

  const {
    data: submissionsData = [],
    isLoading: submissionsLoading,
    error: submissionsError,
    refetch: refetchSubmissions,
  } = useGetSubmissionsByOrganizerQuery();

  const {
    data: participantsData = [],
    isLoading: participantsLoading,
    error: participantsError,
    refetch: refetchParticipants,
  } = useGetParticipantsByOrganizerQuery();

  // Calculate dashboard metrics
  const hackathonCount = hackathonData?.length || 0;
  const activeHackathons =
    hackathonData?.filter((h: Hackathon) => h.status === "ONGOING").length || 0;
  const completedHackathons =
    hackathonData?.filter((h: Hackathon) => h.status === "COMPLETED").length ||
    0;
  const teamCount = teamsData?.length || 0;
  const submissionCount = submissionsData?.length || 0;
  const participantCount = participantsData?.length || 0;

  // Calculate total prize money across all hackathons
  const totalPrizeMoney = useMemo(
    () =>
      hackathonData?.reduce(
        (sum: number, hackathon: any) => sum + (hackathon.prizeMoney || 0),
        0
      ) || 0,
    [hackathonData]
  );

  // Data for charts
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const participationData = useMemo(() => {
    const data = new Array(12).fill(0);
    hackathonData?.forEach((hackathon: any) => {
      if (hackathon.startDate) {
        const month = new Date(hackathon.startDate).getMonth();
        data[month]++;
      }
    });
    return monthNames.map((month, index) => ({
      name: month,
      value: data[index],
    }));
  }, [hackathonData]);

  const submissionData = useMemo(() => {
    const data = new Array(12).fill(0);
    submissionsData?.forEach((submission: any) => {
      if (submission.submittedAt) {
        const month = new Date(submission.submittedAt).getMonth();
        data[month]++;
      }
    });
    return monthNames.map((month, index) => ({
      name: month,
      value: data[index],
    }));
  }, [submissionsData]);

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

  // Filter data based on search query
  const filteredHackathons = useMemo(() => {
    if (!searchQuery.trim()) return hackathonData;
    return hackathonData?.filter(
      (hackathon: any) =>
        hackathon.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        submission.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  // Check if anything is loading
  const isLoading =
    hackathonLoading ||
    teamsLoading ||
    submissionsLoading ||
    participantsLoading;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-2)] p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header Component */}
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
                onClick={() => router.push("/hackathon/create")}
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
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="hackathons"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Hackathons
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              <Users className="h-4 w-4 mr-2" />
              Teams
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Submissions
            </TabsTrigger>
            <TabsTrigger
              value="participants"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Participants
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Hackathons"
                  value={hackathonCount}
                  icon={
                    <Calendar className="h-5 w-5 text-[var(--primary-9)]" />
                  }
                  description={`${activeHackathons} active, ${completedHackathons} completed`}
                  trend={5}
                />
                <StatsCard
                  title="Total Teams"
                  value={teamCount}
                  icon={<Users className="h-5 w-5 text-[var(--primary-9)]" />}
                  description="Across all your hackathons"
                  trend={12}
                />
                <StatsCard
                  title="Total Participants"
                  value={participantCount}
                  icon={<Trophy className="h-5 w-5 text-[var(--primary-9)]" />}
                  description="Active community members"
                  trend={8}
                />
                <StatsCard
                  title="Prize Money"
                  value={`$${totalPrizeMoney.toLocaleString()}`}
                  icon={
                    <DollarSign className="h-5 w-5 text-[var(--primary-9)]" />
                  }
                  description="Total rewards offered"
                  trend={15}
                />
              </div>

              {/* Main Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3 bg-[var(--primary-1)]">
                  <CardHeader>
                    <CardTitle>Hackathon Activity</CardTitle>
                    <CardDescription>
                      Monthly participation and submission trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <BarChartComponent
                        participationData={participationData}
                        submissionData={submissionData}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-[var(--primary-1)]">
                  <CardHeader>
                    <CardTitle>Success Metrics</CardTitle>
                    <CardDescription>
                      Key performance indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          Participant Engagement
                        </span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="w-full bg-[var(--primary-3)] rounded-full h-2">
                        <div
                          className="bg-[var(--primary-9)] h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          Submission Rate
                        </span>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                      <div className="w-full bg-[var(--primary-3)] rounded-full h-2">
                        <div
                          className="bg-[var(--primary-8)] h-2 rounded-full"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          Completion Rate
                        </span>
                        <span className="text-sm font-medium">93%</span>
                      </div>
                      <div className="w-full bg-[var(--primary-3)] rounded-full h-2">
                        <div
                          className="bg-[var(--primary-10)] h-2 rounded-full"
                          style={{ width: "93%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          Feedback Coverage
                        </span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="w-full bg-[var(--primary-3)] rounded-full h-2">
                        <div
                          className="bg-[var(--primary-7)] h-2 rounded-full"
                          style={{ width: "68%" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => window.open("/analytics", "_blank")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Analytics Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Active Hackathons and Latest Submissions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-[var(--primary-1)]">
                  <CardHeader>
                    <CardTitle>Active Hackathons</CardTitle>
                    <CardDescription>Currently running events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeHackathons > 0 ? (
                        hackathonData
                          ?.filter((h: any) => h.status === "ONGOING")
                          .slice(0, 3)
                          .map((hackathon: any, i: number) => (
                            <div
                              key={hackathon.id || i}
                              className="flex items-center justify-between border-b border-[var(--primary-5)] pb-2 last:border-0"
                            >
                              <div>
                                <p className="font-medium">
                                  {hackathon.name || `Hackathon ${i + 1}`}
                                </p>
                                <p className="text-xs text-[var(--muted-foreground)]">
                                  <Clock className="inline h-3 w-3 mr-1" />
                                  {hackathon.endDate
                                    ? `Ends ${new Date(hackathon.endDate).toLocaleDateString()}`
                                    : "Date not specified"}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  router.push(`/hackathon/${hackathon.id}`)
                                }
                              >
                                View
                              </Button>
                            </div>
                          ))
                      ) : (
                        <p className="text-[var(--muted-foreground)] text-center py-4">
                          No active hackathons
                        </p>
                      )}
                    </div>
                  </CardContent>
                  {activeHackathons > 3 && (
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full text-[var(--primary-9)]"
                        onClick={() => setActiveTab("hackathons")}
                      >
                        View all active hackathons
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                <Card className="bg-[var(--primary-1)]">
                  <CardHeader>
                    <CardTitle>Latest Submissions</CardTitle>
                    <CardDescription>
                      Recent project submissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {submissionCount > 0 ? (
                        submissionsData
                          ?.slice(0, 3)
                          .map((submission: any, i: number) => (
                            <div
                              key={submission.id || i}
                              className="flex items-center justify-between border-b border-[var(--primary-5)] pb-2 last:border-0"
                            >
                              <div>
                                <p className="font-medium">
                                  {submission.name || `Project ${i + 1}`}
                                </p>
                                <p className="text-xs text-[var(--muted-foreground)]">
                                  {submission.Team?.name || "Team"} •{" "}
                                  {submission.submittedAt
                                    ? new Date(
                                        submission.submittedAt
                                      ).toLocaleDateString()
                                    : new Date().toLocaleDateString()}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  router.push(`/submission/${submission.id}`)
                                }
                              >
                                Review
                              </Button>
                            </div>
                          ))
                      ) : (
                        <p className="text-[var(--muted-foreground)] text-center py-4">
                          No recent submissions
                        </p>
                      )}
                    </div>
                  </CardContent>
                  {submissionCount > 3 && (
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="w-full text-[var(--primary-9)]"
                        onClick={() => setActiveTab("submissions")}
                      >
                        View all submissions
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>

              {/* Upcoming Events */}
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-[var(--primary-1)]">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Scheduled hackathons</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {hackathonData
                        ?.filter((h: any) => h.status === "UPCOMING")
                        .slice(0, 3)
                        .map((hackathon: any, i: number) => (
                          <div
                            key={hackathon.id || i}
                            className="flex items-center space-x-4 border-b border-[var(--primary-5)] pb-4 last:border-0"
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-3)]">
                              <Calendar className="h-6 w-6 text-[var(--primary-9)]" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {hackathon.name ||
                                  `Upcoming Hackathon ${i + 1}`}
                              </div>
                              <div className="text-sm text-[var(--muted-foreground)]">
                                {hackathon.startDate
                                  ? `Starts ${new Date(hackathon.startDate).toLocaleDateString()}`
                                  : "Date not specified"}
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="bg-[var(--primary-3)] text-[var(--primary-11)]"
                            >
                              Upcoming
                            </Badge>
                          </div>
                        ))}
                      {!hackathonData?.filter(
                        (h: any) => h.status === "UPCOMING"
                      ).length && (
                        <p className="text-[var(--muted-foreground)] text-center py-4">
                          No upcoming hackathons scheduled
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Hackathons Tab */}
          <TabsContent value="hackathons">
            <Card className="bg-[var(--primary-1)]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Hackathons</CardTitle>
                  <CardDescription>
                    Manage and monitor your hackathon events
                  </CardDescription>
                </div>
                <Button
                  onClick={() => router.push("/hackathon/create")}
                  className="bg-[var(--primary-9)] text-[var(--primary-1)] hover:bg-[var(--primary-5)] transition duration-200 ease-out"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Hackathon
                </Button>
              </CardHeader>
              <CardContent>
                {hackathonLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-9)]" />
                  </div>
                ) : hackathonError ? (
                  <div className="text-center py-8 text-[var(--destructive)]">
                    <p>Failed to load hackathon data</p>
                    <Button
                      onClick={refetchHackathons}
                      variant="outline"
                      className="mt-2"
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                ) : filteredHackathons?.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Teams</TableHead>
                        <TableHead>Submissions</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHackathons.map((hackathon: any) => (
                        <TableRow key={hackathon.id}>
                          <TableCell className="font-medium">
                            {hackathon.name}
                          </TableCell>
                          <TableCell>
                            <HackathonStatusBadge status={hackathon.status} />
                          </TableCell>
                          <TableCell>{hackathon.Team?.length || 0}</TableCell>
                          <TableCell>
                            {hackathon.Submission?.length || 0}
                          </TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <div>
                                Start:{" "}
                                {hackathon.startDate
                                  ? new Date(
                                      hackathon.startDate
                                    ).toLocaleDateString()
                                  : "Not set"}
                              </div>
                              <div>
                                End:{" "}
                                {hackathon.endDate
                                  ? new Date(
                                      hackathon.endDate
                                    ).toLocaleDateString()
                                  : "Not set"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <HackathonActions hackathon={hackathon} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-[var(--muted-foreground)]">
                    <p>No hackathons found</p>
                    {searchQuery && (
                      <p className="mt-2">Try adjusting your search query</p>
                    )}
                    {!searchQuery && (
                      <Button
                        onClick={() => router.push("/hackathon/create")}
                        variant="outline"
                        className="mt-4"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Hackathon
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <Card className="bg-[var(--primary-1)]">
              <CardHeader>
                <CardTitle>Teams</CardTitle>
                <CardDescription>
                  Manage teams across all your hackathons
                </CardDescription>
              </CardHeader>
              <CardContent>
                {teamsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-9)]" />
                  </div>
                ) : teamsError ? (
                  <div className="text-center py-8 text-[var(--destructive)]">
                    <p>Failed to load teams data</p>
                    <Button
                      onClick={refetchTeams}
                      variant="outline"
                      className="mt-2"
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                ) : filteredTeams?.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Hackathon</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Submission</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTeams.map((team: any) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">
                            {team.name}
                          </TableCell>
                          <TableCell>
                            {team.Hackathon?.name || "Unknown"}
                          </TableCell>
                          <TableCell>{team.TeamMember?.length || 0}</TableCell>
                          <TableCell>
                            {team.Submission ? (
                              <Badge
                                variant="secondary"
                                className="bg-[var(--primary-3)] text-[var(--primary-11)]"
                              >
                                Submitted
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-[var(--primary-2)] text-[var(--primary-10)]"
                              >
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => router.push(`/team/${team.id}`)}
                              >
                                View
                              </Button>
                              <TeamDetailsDialog team={team} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-[var(--muted-foreground)]">
                    <p>No teams found</p>
                    {searchQuery && (
                      <p className="mt-2">Try adjusting your search query</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card className="bg-[var(--primary-1)]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Submissions</CardTitle>
                  <CardDescription>
                    Review and evaluate hackathon submissions
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Submissions</DropdownMenuItem>
                    <DropdownMenuItem>Needs Review</DropdownMenuItem>
                    <DropdownMenuItem>Reviewed</DropdownMenuItem>
                    <DropdownMenuItem>Shortlisted</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                {submissionsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-9)]" />
                  </div>
                ) : submissionsError ? (
                  <div className="text-center py-8 text-[var(--destructive)]">
                    <p>Failed to load submissions data</p>
                    <Button
                      onClick={refetchSubmissions}
                      variant="outline"
                      className="mt-2"
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                ) : filteredSubmissions?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSubmissions.map((submission: any) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[var(--muted-foreground)]">
                    <p>No submissions found</p>
                    {searchQuery && (
                      <p className="mt-2">Try adjusting your search query</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants">
            <Card className="bg-[var(--primary-1)]">
              <CardHeader>
                <CardTitle>Participants</CardTitle>
                <CardDescription>
                  View all participants across your hackathons
                </CardDescription>
              </CardHeader>
              <CardContent>
                {participantsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-9)]" />
                  </div>
                ) : participantsError ? (
                  <div className="text-center py-8 text-[var(--destructive)]">
                    <p>Failed to load participants data</p>
                    <Button
                      onClick={refetchParticipants}
                      variant="outline"
                      className="mt-2"
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                ) : filteredParticipants?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredParticipants.map((participant: any) => (
                      <ParticipantCard
                        key={participant.id}
                        participant={participant}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[var(--muted-foreground)]">
                    <p>No participants found</p>
                    {searchQuery && (
                      <p className="mt-2">Try adjusting your search query</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-[var(--primary-1)]">
              <CardHeader>
                <CardTitle>Organiser Settings</CardTitle>
                <CardDescription>
                  Manage your organiser profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Organiser Profile</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Customize your organiser profile and branding
                  </p>
                  <Button variant="outline">Edit Profile</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Manage email and platform notifications
                  </p>
                  <Button variant="outline">Manage Notifications</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Integration Settings</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Connect external services and platforms
                  </p>
                  <Button variant="outline">Manage Integrations</Button>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Analytics Preferences</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Customize dashboard analytics and reports
                  </p>
                  <Button variant="outline">Customize Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}

// Helper Components
function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
  trend: number;
}) {
  return (
    <Card className="bg-[var(--primary-1)] shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {icon}
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-[var(--muted-foreground)]">
            {description}
          </p>
          <Badge
            variant="outline"
            className={
              trend > 0
                ? "bg-[var(--primary-3)] text-[var(--primary-11)]"
                : "bg-[var(--primary-4)] text-[var(--primary-11)]"
            }
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function BarChartComponent({ participationData, submissionData }: any) {
  // This is a simplified chart implementation for the example
  // In a real application, you would use a proper chart library like Chart.js or Recharts
  const maxValue = Math.max(
    ...participationData.map((d: any) => d.value),
    ...submissionData.map((d: any) => d.value)
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--primary-9)] rounded-full"></div>
          <span className="text-sm">Participation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--primary-5)] rounded-full"></div>
          <span className="text-sm">Submissions</span>
        </div>
      </div>
      <div className="flex-1 flex items-end">
        <div className="flex-1 flex items-end h-full">
          {participationData.map((item: any, index: number) => (
            <div
              key={item.name}
              className="flex-1 flex flex-col items-center justify-end h-full"
            >
              <div className="relative w-full px-1 flex flex-col items-center">
                <div
                  className="w-full bg-[var(--primary-9)] rounded-t-sm"
                  style={{
                    height: `${(item.value / maxValue) * 100}%`,
                    maxHeight: "90%",
                    minHeight: item.value ? "5%" : "0%",
                  }}
                ></div>
                <div
                  className="w-full bg-[var(--primary-5)] rounded-t-sm mt-1"
                  style={{
                    height: `${(submissionData[index]?.value / maxValue) * 100}%`,
                    maxHeight: "90%",
                    minHeight: submissionData[index]?.value ? "5%" : "0%",
                  }}
                ></div>
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HackathonStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "UPCOMING":
      return (
        <Badge
          variant="outline"
          className="bg-[var(--primary-4)] text-[var(--primary-12)]"
        >
          Upcoming
        </Badge>
      );
    case "ONGOING":
      return (
        <Badge
          variant="outline"
          className="bg-[var(--primary-3)] text-[var(--primary-11)]"
        >
          Active
        </Badge>
      );
    case "COMPLETED":
      return (
        <Badge
          variant="outline"
          className="bg-[var(--primary-5)] text-[var(--primary-11)]"
        >
          Completed
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="bg-[var(--primary-2)] text-[var(--primary-10)]"
        >
          {status}
        </Badge>
      );
  }
}

function HackathonActions({ hackathon }: { hackathon: any }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/hackathon/${hackathon.id}`)}
      >
        View
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => router.push(`/hackathon/${hackathon.id}/edit`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/hackathon/${hackathon.id}/teams`)}
          >
            Manage Teams
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/hackathon/${hackathon.id}/submissions`)
            }
          >
            Review Submissions
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-[var(--destructive)]">
            Cancel Hackathon
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function TeamDetailsDialog({ team }: { team: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[var(--primary-2)]">
        <DialogHeader>
          <DialogTitle>{team.name}</DialogTitle>
          <DialogDescription>
            {team.Hackathon?.name || "Hackathon"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-medium mb-2">Team Members</h4>
          <div className="space-y-3">
            {team.TeamMember?.map((member: any) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={member.User?.profileImageUrl}
                    alt={member.User?.name}
                  />
                  <AvatarFallback className="bg-[var(--primary-4)]">
                    {member.User?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {member.User?.name || "Unknown User"}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {member.isLeader ? "Team Leader" : "Member"}
                  </p>
                </div>
              </div>
            ))}
            {!team.TeamMember?.length && (
              <p className="text-sm text-[var(--muted-foreground)]">
                No members in this team
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SubmissionCard({ submission }: { submission: any }) {
  return (
    <Card className="bg-[var(--primary-2)] hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {submission.name || "Untitled Submission"}
        </CardTitle>
        <CardDescription>
          By {submission.Team?.name || "Unknown Team"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-3">
          {submission.description ||
            "No description provided for this submission."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <div className="text-xs text-[var(--muted-foreground)]">
            {submission.submittedAt
              ? new Date(submission.submittedAt).toLocaleDateString()
              : "No date"}
          </div>
        </div>
        <Button size="sm" variant="outline">
          Review
        </Button>
      </CardFooter>
    </Card>
  );
}

function ParticipantCard({ participant }: { participant: any }) {
  return (
    <Card className="bg-[var(--primary-2)] hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={participant.profileImageUrl}
              alt={participant.name}
            />
            <AvatarFallback className="bg-[var(--primary-4)]">
              {participant.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">
              {participant.name || "Anonymous User"}
            </CardTitle>
            <CardDescription className="text-xs">
              {participant.institutionName || participant.type || "Participant"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {participant.Skill?.slice(0, 3).map((skill: any) => (
            <Badge
              key={skill.id}
              variant="outline"
              className="text-xs bg-[var(--primary-3)] text-[var(--primary-11)]"
            >
              {skill.name}
            </Badge>
          ))}
          {participant.Skill?.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs bg-[var(--primary-3)] text-[var(--primary-11)]"
            >
              +{participant.Skill.length - 3} more
            </Badge>
          )}
        </div>
        <div className="text-xs text-[var(--muted-foreground)] mt-2">
          {participant.email}
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline" className="w-full">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
}

// The mock API implementations remain the same
function useGetHackathonsByOrganizerQuery() {
  // Mock implementation - replace with your actual API call
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData([
        {
          id: "1",
          name: "AI Innovation Hackathon",
          description: "Build AI solutions for real-world problems",
          status: "ONGOING",
          startDate: new Date(2025, 5, 1),
          endDate: new Date(2025, 5, 15),
          prizeMoney: 5000,
          Team: [{ id: "1" }, { id: "2" }, { id: "3" }],
          Submission: [{ id: "1" }, { id: "2" }],
        },
        {
          id: "2",
          name: "Mobile Dev Challenge",
          description: "Create innovative mobile applications",
          status: "UPCOMING",
          startDate: new Date(2025, 6, 10),
          endDate: new Date(2025, 6, 24),
          prizeMoney: 3000,
          Team: [],
          Submission: [],
        },
        {
          id: "3",
          name: "Web3 Hackathon",
          description: "Develop blockchain and web3 solutions",
          status: "COMPLETED",
          startDate: new Date(2025, 4, 5),
          endDate: new Date(2025, 4, 19),
          prizeMoney: 7000,
          Team: [{ id: "4" }, { id: "5" }],
          Submission: [{ id: "3" }, { id: "4" }, { id: "5" }],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Same data for demo purposes
      setIsLoading(false);
    }, 1000);
  };

  return { data, isLoading, error, refetch };
}

function useGetTeamsByOrganizerQuery() {
  // Mock implementation - replace with your actual API call
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData([
        {
          id: "1",
          name: "Team Alpha",
          Hackathon: { id: "1", name: "AI Innovation Hackathon" },
          TeamMember: [
            {
              id: "1",
              isLeader: true,
              User: { name: "John Doe", profileImageUrl: "" },
            },
            {
              id: "2",
              isLeader: false,
              User: { name: "Jane Smith", profileImageUrl: "" },
            },
          ],
          Submission: { id: "1", name: "AlphaBot" },
        },
        {
          id: "2",
          name: "Team Beta",
          Hackathon: { id: "1", name: "AI Innovation Hackathon" },
          TeamMember: [
            {
              id: "3",
              isLeader: true,
              User: { name: "Mike Johnson", profileImageUrl: "" },
            },
          ],
          Submission: null,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return { data, isLoading, error, refetch };
}

function useGetSubmissionsByOrganizerQuery() {
  // Mock implementation - replace with your actual API call
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData([
        {
          id: "1",
          name: "AlphaBot",
          description:
            "An AI assistant that helps developers write better code",
          submittedAt: new Date(2025, 5, 10),
          Team: { name: "Team Alpha" },
          Feedback: [],
          Rating: [],
        },
        {
          id: "3",
          name: "BlockChain Explorer",
          description: "A visualization tool for blockchain transactions",
          submittedAt: new Date(2025, 4, 18),
          Team: { name: "Team Gamma" },
          Feedback: [{ id: "1" }],
          Rating: [{ id: "1", value: 4.5 }],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return { data, isLoading, error, refetch };
}

function useGetParticipantsByOrganizerQuery() {
  // Mock implementation - replace with your actual API call
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData([
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          profileImageUrl: "",
          institutionName: "Tech University",
          type: "STUDENT",
          Skill: [
            { id: "1", name: "JavaScript" },
            { id: "2", name: "React" },
            { id: "3", name: "Node.js" },
            { id: "4", name: "MongoDB" },
          ],
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          profileImageUrl: "",
          institutionName: "Design College",
          type: "STUDENT",
          Skill: [
            { id: "5", name: "UI/UX" },
            { id: "6", name: "Figma" },
          ],
        },
        {
          id: "3",
          name: "Mike Johnson",
          email: "mike@example.com",
          profileImageUrl: "",
          institutionName: "Tech Corp",
          type: "PROFESSIONAL",
          Skill: [
            { id: "7", name: "Python" },
            { id: "8", name: "Machine Learning" },
            { id: "9", name: "AI" },
          ],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return { data, isLoading, error, refetch };
}
