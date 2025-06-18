"use client";

import React, { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "motion/react";
import {
  Users,
  FileCode,
  Award,
  ChevronDown,
  Clock,
  Calendar,
  MapPin,
  Search,
  BarChart,
  RefreshCcw,
  Eye,
  User,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatDistanceToNow, format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

import {
  useGetHackathonByIdQuery,
  useGetTeamsByHackathonIdQuery,
  useGetSubmissionsByHackathonIdQuery,
  useGetParticipantsByHackathonIdQuery,
} from "@/apiSlice/hackathonApiSlice";

interface HackathonData {
  id: string;
  title: string;
  description: string;
  location?: string;
  mode: string;
  maxTeamSize: number;
  createdBy: {
    id: string;
    name: string;
    profileImageUrl?: string;
  };
  registrationDate: string;
  startDate: string;
  endDate: string;
  status: string;
  bannerImageUrl?: string;
  registeredParticipants: number;
  tags: string[];
  tabs?: Array<{
    title: string;
    content: string;
    isVisible: boolean;
    order: number;
  }>;
  createdAt: string;
}

interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  isLeader: boolean;
  User?: {
    name: string;
    email: string;
    profileImageUrl?: string;
  };
}

interface Team {
  id: string;
  name: string;
  description?: string;
  hackathonId: string;
  lookingForMembers?: boolean;
  TeamMember: TeamMember[];
}

interface Submission {
  id: string;
  title: string;
  description: string;
  teamId: string;
  hackathonId: string;
  submittedAt: string;
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  imageUrls?: string[];
  Team?: {
    name: string;
  };
}

interface Participant {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  registeredAt: string;
  teamId: string | null;
  teamName: string | null;
  isTeamLeader: boolean;
}

export default function HackathonAnalytics() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Extract the hackathon ID from URL params
  const hackathonId = Array.isArray(params["hackathon-id"])
    ? params["hackathon-id"][0]
    : params["hackathon-id"];

  // Fetch data using the API hooks
  const {
    data: hackathonData,
    isLoading: isHackathonLoading,
    error: hackathonError,
    refetch: refetchHackathon,
  } = useGetHackathonByIdQuery(hackathonId) as {
    data: HackathonData | undefined;
    isLoading: boolean;
    error: unknown;
    refetch: () => Promise<unknown>;
  };

  const {
    data: teamsData = [],
    isLoading: isTeamsLoading,
    error: teamsError,
    refetch: refetchTeams,
  } = useGetTeamsByHackathonIdQuery(hackathonId) as {
    data: Team[];
    isLoading: boolean;
    error: unknown;
    refetch: () => Promise<unknown>;
  };

  const {
    data: submissionsData = [],
    isLoading: isSubmissionsLoading,
    error: submissionsError,
    refetch: refetchSubmissions,
  } = useGetSubmissionsByHackathonIdQuery(hackathonId) as {
    data: Submission[];
    isLoading: boolean;
    error: unknown;
    refetch: () => Promise<unknown>;
  };

  const {
    data: participantsData = [],
    isLoading: isParticipantsLoading,
    error: participantsError,
    refetch: refetchParticipants,
  } = useGetParticipantsByHackathonIdQuery(hackathonId) as {
    data: Participant[];
    isLoading: boolean;
    error: unknown;
    refetch: () => Promise<unknown>;
  };

  // Check if the current user is authorized to view this dashboard
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user === null) {
    window.location.replace("/");
  }

  const isAuthorized = useMemo(() => {
    if (!hackathonData || !user) return false;
    return (
      user.roles?.includes("ADMIN") ||
      user.roles?.includes("ORGANIZER") ||
      hackathonData.createdBy.id === user.id
    );
  }, [hackathonData, user]);

  // Calculate metrics
  const metrics = useMemo(() => {
    if (!hackathonData) return null;

    const now = new Date();
    const startDate = new Date(hackathonData.startDate);
    const endDate = new Date(hackathonData.endDate);

    // Calculate time progress
    let timeProgress = 0;
    if (now > endDate) {
      timeProgress = 100;
    } else if (now > startDate) {
      const totalDuration = endDate.getTime() - startDate.getTime();
      const elapsed = now.getTime() - startDate.getTime();
      timeProgress = Math.min(100, Math.round((elapsed / totalDuration) * 100));
    }

    // Calculate submission rate
    const submissionRate =
      teamsData.length > 0
        ? Math.round((submissionsData.length / teamsData.length) * 100)
        : 0;

    // Calculate days until start/end
    const daysRemaining = Math.max(
      0,
      Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24)),
    );

    return {
      teamCount: teamsData.length,
      submissionCount: submissionsData.length,
      participantCount: participantsData.length,
      submissionRate,
      timeProgress,
      daysRemaining,
      status: hackathonData.status,
    };
  }, [hackathonData, teamsData, submissionsData, participantsData]);

  // Filter data based on search query
  const filteredTeams = useMemo(() => {
    if (!teamsData) return [];

    let filtered = teamsData;
    if (teamFilter === "with-submissions") {
      filtered = teamsData.filter((team) =>
        submissionsData.some((sub) => sub.teamId === team.id),
      );
    } else if (teamFilter === "without-submissions") {
      filtered = teamsData.filter(
        (team) => !submissionsData.some((sub) => sub.teamId === team.id),
      );
    }

    if (!searchQuery.trim()) return filtered;

    return filtered.filter(
      (team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (team.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false),
    );
  }, [teamsData, submissionsData, searchQuery, teamFilter]);

  const filteredSubmissions = useMemo(() => {
    if (!submissionsData || !searchQuery.trim()) return submissionsData;

    return submissionsData.filter(
      (submission) =>
        submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [submissionsData, searchQuery]);

  const filteredParticipants = useMemo(() => {
    if (!participantsData || !searchQuery.trim()) return participantsData;

    return participantsData.filter(
      (participant) =>
        participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [participantsData, searchQuery]);

  // Handle refreshing the data
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchHackathon(),
        refetchTeams(),
        refetchSubmissions(),
        refetchParticipants(),
      ]);
      toast.success("Dashboard data refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh data");
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Check if the data is still loading
  const isLoading =
    isHackathonLoading ||
    isTeamsLoading ||
    isSubmissionsLoading ||
    isParticipantsLoading;
  const hasError =
    hackathonError || teamsError || submissionsError || participantsError;

  // Show a loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-2)] p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-9)] mx-auto mb-4" />
          <h3 className="text-xl font-medium text-[var(--primary-12)]">
            Loading dashboard data...
          </h3>
          <p className="text-[var(--primary-11)] mt-2">
            Please wait while we retrieve the hackathon information
          </p>
        </div>
      </div>
    );
  }

  // Show an error state if there was a problem fetching the data
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-2)] p-6 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-[var(--destructive)] mx-auto mb-4" />
          <h3 className="text-xl font-medium text-[var(--primary-12)]">
            Error loading data
          </h3>
          <p className="text-[var(--primary-11)] mt-2 mb-6">
            There was a problem retrieving the hackathon information
          </p>
          <Button onClick={refreshData} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Try Again
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Make sure we have hackathon data
  if (!hackathonData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-2)] p-6 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-[var(--destructive)] mx-auto mb-4" />
          <h3 className="text-xl font-medium text-[var(--primary-12)]">
            Hackathon not found
          </h3>
          <p className="text-[var(--primary-11)] mt-2 mb-6">
            The hackathon you're looking for doesn't exist or has been removed
          </p>
          <Button onClick={() => router.push("/events")}>Back to Events</Button>
        </div>
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
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm text-[var(--primary-11)] mb-1 flex items-center gap-2">
                <span
                  onClick={() => router.push("/events")}
                  className="cursor-pointer hover:text-[var(--primary-12)]"
                >
                  Events
                </span>
                <span>/</span>
                <span
                  onClick={() => router.push(`/events/${hackathonId}`)}
                  className="cursor-pointer hover:text-[var(--primary-12)]"
                >
                  {hackathonData.title}
                </span>
                <span>/</span>
                <span>Analytics</span>
              </div>
              <h1 className="text-2xl font-bold text-[var(--primary-12)]">
                {hackathonData.title} - Analytics
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="bg-[var(--primary-3)] text-[var(--primary-11)]"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {format(
                    new Date(hackathonData.startDate),
                    "MMM d, yyyy",
                  )} - {format(new Date(hackathonData.endDate), "MMM d, yyyy")}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-[var(--primary-3)] text-[var(--primary-11)]"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {hackathonData.mode}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-[var(--primary-3)] text-[var(--primary-11)]"
                >
                  <Users className="w-3 h-3 mr-1" />
                  Max {hackathonData.maxTeamSize} per team
                </Badge>
                <StatusBadge status={hackathonData.status} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => router.push(`/events/${hackathonId}`)}
                variant="outline"
                className="border-[var(--primary-7)] hover:bg-[var(--primary-4)] transition duration-200 ease-out"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Hackathon
              </Button>
              <Button
                onClick={refreshData}
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
              placeholder="Search teams, submissions, or participants..."
              className="pl-10 bg-[var(--primary-1)] border-[var(--primary-7)] focus:border-[var(--primary-8)]"
            />
          </div>
        </div>

        {/* Stats Overview */}
        {metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard
              title="Teams"
              value={metrics.teamCount}
              icon={<Users className="h-5 w-5 text-[var(--primary-9)]" />}
              description={`${hackathonData.registeredParticipants} registered participants`}
            />
            <StatsCard
              title="Submissions"
              value={metrics.submissionCount}
              icon={<FileCode className="h-5 w-5 text-[var(--primary-9)]" />}
              description={`${metrics.submissionRate}% submission rate`}
            />
            <StatsCard
              title="Time Progress"
              value={`${metrics.timeProgress}%`}
              icon={<Clock className="h-5 w-5 text-[var(--primary-9)]" />}
              description={
                metrics.status === "UPCOMING"
                  ? `Starts in ${metrics.daysRemaining} days`
                  : metrics.status === "LIVE"
                    ? `${metrics.daysRemaining} days remaining`
                    : "Hackathon completed"
              }
            />
            <StatsCard
              title="Tags"
              value={hackathonData.tags.length}
              icon={<Award className="h-5 w-5 text-[var(--primary-9)]" />}
              description={hackathonData.tags.join(", ")}
            />
          </div>
        )}

        {/* Tabs Navigation */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-[var(--primary-3)] p-1 w-full max-w-3xl mx-auto">
            <TabsTrigger
              value="overview"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              <BarChart className="h-4 w-4 mr-2" />
              Overview
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
              <FileCode className="h-4 w-4 mr-2" />
              Submissions
            </TabsTrigger>
            <TabsTrigger
              value="participants"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-[var(--primary-1)]"
            >
              <User className="h-4 w-4 mr-2" />
              Participants
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Hackathon Details */}
              <Card className="bg-[var(--primary-1)]">
                <CardHeader>
                  <CardTitle>Hackathon Details</CardTitle>
                  <CardDescription>
                    Basic information about this hackathon
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">
                        Description
                      </h3>
                      <p className="text-[var(--primary-11)]">
                        {hackathonData.description || "No description provided"}
                      </p>

                      <h3 className="text-sm font-medium text-[var(--muted-foreground)] mt-4 mb-1">
                        Created By
                      </h3>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={hackathonData.createdBy.profileImageUrl}
                          />
                          <AvatarFallback className="bg-[var(--primary-4)]">
                            {getInitials(hackathonData.createdBy.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[var(--primary-12)]">
                          {hackathonData.createdBy.name}
                        </span>
                      </div>

                      <h3 className="text-sm font-medium text-[var(--muted-foreground)] mt-4 mb-1">
                        Created
                      </h3>
                      <p className="text-[var(--primary-11)]">
                        {formatDistanceToNow(
                          new Date(hackathonData.createdAt),
                          { addSuffix: true },
                        )}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">
                        Timeline
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[var(--primary-11)]">
                            Registration Opens
                          </span>
                          <span className="text-sm font-medium">
                            {format(
                              new Date(hackathonData.registrationDate),
                              "MMM d, yyyy",
                            )}
                          </span>
                        </div>
                        <Progress
                          value={getTimelineProgress(
                            hackathonData.registrationDate,
                            hackathonData.startDate,
                            hackathonData.endDate,
                          )}
                          className="h-2 bg-[var(--primary-4)]"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[var(--primary-11)]">
                            Hackathon Starts
                          </span>
                          <span className="text-sm font-medium">
                            {format(
                              new Date(hackathonData.startDate),
                              "MMM d, yyyy",
                            )}
                          </span>
                        </div>
                        <Progress
                          value={getTimelineProgress(
                            hackathonData.startDate,
                            hackathonData.startDate,
                            hackathonData.endDate,
                          )}
                          className="h-2 bg-[var(--primary-4)]"
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[var(--primary-11)]">
                            Hackathon Ends
                          </span>
                          <span className="text-sm font-medium">
                            {format(
                              new Date(hackathonData.endDate),
                              "MMM d, yyyy",
                            )}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium text-[var(--muted-foreground)] mt-4 mb-1">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {hackathonData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-[var(--primary-3)] text-[var(--primary-11)]"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {hackathonData.tags.length === 0 && (
                          <span className="text-sm text-[var(--muted-foreground)]">
                            No tags
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Stats */}
              <Card className="bg-[var(--primary-1)]">
                <CardHeader>
                  <CardTitle>Participation Overview</CardTitle>
                  <CardDescription>
                    Teams and participation statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">
                          Team Registration
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[var(--primary-11)]">
                            Teams registered
                          </span>
                          <span className="text-sm font-medium">
                            {metrics?.teamCount || 0} teams
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">
                          Submission Status
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[var(--primary-11)]">
                            Teams with submissions
                          </span>
                          <span className="text-sm font-medium">
                            {metrics?.submissionCount || 0}/
                            {metrics?.teamCount || 0} teams
                          </span>
                        </div>
                        <Progress
                          value={metrics?.submissionRate || 0}
                          className="h-2 bg-[var(--primary-4)]"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">
                        Team Composition
                      </h3>
                      {teamsData.length > 0 ? (
                        <div className="space-y-2">
                          <TeamSizePieChart
                            teamsData={teamsData}
                            maxTeamSize={hackathonData.maxTeamSize}
                          />
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-[var(--muted-foreground)]">
                                Average Team Size
                              </p>
                              <p className="text-lg font-medium">
                                {calculateAverageTeamSize(teamsData)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-[var(--muted-foreground)]">
                                Solo Participants
                              </p>
                              <p className="text-lg font-medium">
                                {
                                  teamsData.filter(
                                    (team) => team.TeamMember.length === 1,
                                  ).length
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                          <p className="text-[var(--muted-foreground)]">
                            No team data available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <Card className="bg-[var(--primary-1)]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Teams</CardTitle>
                  <CardDescription>
                    All teams participating in this hackathon
                  </CardDescription>
                </div>
                <Select value={teamFilter} onValueChange={setTeamFilter}>
                  <SelectTrigger className="w-[180px] bg-[var(--primary-2)] border-[var(--primary-6)]">
                    <SelectValue placeholder="Filter teams" />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--primary-2)] border-[var(--primary-6)]">
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="with-submissions">
                      With Submissions
                    </SelectItem>
                    <SelectItem value="without-submissions">
                      Without Submissions
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                {filteredTeams.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredTeams.map((team) => (
                      <TeamCard
                        key={team.id}
                        team={team}
                        hasSubmission={submissionsData.some(
                          (sub) => sub.teamId === team.id,
                        )}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Users className="h-16 w-16 text-[var(--primary-5)] mb-4" />
                    <p className="text-xl text-[var(--primary-11)] mb-2">
                      No teams found
                    </p>
                    {searchQuery ? (
                      <p className="text-[var(--primary-10)]">
                        Try adjusting your search query
                      </p>
                    ) : teamFilter !== "all" ? (
                      <p className="text-[var(--primary-10)]">
                        No teams match the selected filter
                      </p>
                    ) : (
                      <p className="text-[var(--primary-10)]">
                        Teams will appear here once they register
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card className="bg-[var(--primary-1)]">
              <CardHeader>
                <CardTitle>Submissions</CardTitle>
                <CardDescription>
                  Project submissions for this hackathon
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredSubmissions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredSubmissions.map((submission) => (
                      <SubmissionCard
                        key={submission.id}
                        submission={submission}
                        teams={teamsData}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileCode className="h-16 w-16 text-[var(--primary-5)] mb-4" />
                    <p className="text-xl text-[var(--primary-11)] mb-2">
                      No submissions found
                    </p>
                    {searchQuery ? (
                      <p className="text-[var(--primary-10)]">
                        Try adjusting your search query
                      </p>
                    ) : (
                      <p className="text-[var(--primary-10)]">
                        Submissions will appear here once teams submit their
                        projects
                      </p>
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
                  Individual participants in this hackathon
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredParticipants.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Participant</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Registered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredParticipants.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={participant.profileImageUrl}
                                  alt={participant.name}
                                />
                                <AvatarFallback className="text-xs">
                                  {getInitials(participant.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {participant.name}
                                </div>
                                <div className="text-xs text-[var(--muted-foreground)]">
                                  {participant.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {participant.teamName || "Not in a team"}
                          </TableCell>
                          <TableCell>
                            {participant.isTeamLeader ? (
                              <Badge
                                variant="outline"
                                className="bg-[var(--primary-3)] text-[var(--primary-11)]"
                              >
                                Team Leader
                              </Badge>
                            ) : participant.teamId ? (
                              <Badge
                                variant="outline"
                                className="bg-[var(--primary-2)] text-[var(--primary-10)]"
                              >
                                Member
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-[var(--primary-2)] text-[var(--primary-10)]"
                              >
                                Solo
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatDistanceToNow(
                              new Date(participant.registeredAt),
                              { addSuffix: true },
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <User className="h-16 w-16 text-[var(--primary-5)] mb-4" />
                    <p className="text-xl text-[var(--primary-11)] mb-2">
                      No participants found
                    </p>
                    {searchQuery ? (
                      <p className="text-[var(--primary-10)]">
                        Try adjusting your search query
                      </p>
                    ) : (
                      <p className="text-[var(--primary-10)]">
                        Participants will appear here once they register
                      </p>
                    )}
                  </div>
                )}
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
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
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
        <p className="text-xs text-[var(--muted-foreground)] mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function TeamCard({
  team,
  hasSubmission,
}: {
  team: Team;
  hasSubmission: boolean;
}) {
  const [showMembers, setShowMembers] = useState(false);
  console.log(team);

  return (
    <Card className="bg-[var(--primary-2)] hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{team.name}</CardTitle>
          {hasSubmission ? (
            <Badge className="bg-[var(--primary-9)] text-[var(--primary-1)]">
              Submitted
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-[var(--primary-3)] text-[var(--primary-11)]"
            >
              Not Submitted
            </Badge>
          )}
        </div>
        <CardDescription>
          {team.TeamMember.length} member
          {team.TeamMember.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-[var(--primary-11)] line-clamp-2">
          {team.description || "No team description provided."}
        </p>
      </CardContent>

      <div className="px-6">
        <button
          onClick={() => setShowMembers(!showMembers)}
          className="w-full flex items-center justify-between text-sm text-[var(--primary-11)] hover:text-[var(--primary-12)] transition-colors py-2"
        >
          <span>Team Members</span>
          {showMembers ? <ChevronDown size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {showMembers && (
        <div className="px-6 py-3 border-t border-[var(--primary-5)]">
          <div className="space-y-2">
            {team.TeamMember.map((member, index) => (
              <div
                key={member.id || index}
                className="flex items-center gap-2 text-sm"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.User?.profileImageUrl} />
                  <AvatarFallback className="text-xs bg-[var(--primary-3)]">
                    {member.User?.name ? getInitials(member.User.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1">
                  {member.User?.name || "Unknown User"}
                </span>
                {member.isLeader && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-[var(--primary-3)] px-2"
                  >
                    Leader
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <CardFooter className="pb-3 pt-1">
        <Button variant="outline" size="sm" className="w-full">
          View Team Details
        </Button>
      </CardFooter>
    </Card>
  );
}

function SubmissionCard({
  submission,
  teams,
}: {
  submission: Submission;
  teams: Team[];
}) {
  // Find the team name for this submission
  const teamName = useMemo(() => {
    if (submission.Team?.name) return submission.Team.name;
    const team = teams.find((t) => t.id === submission.teamId);
    return team?.name || "Unknown Team";
  }, [submission, teams]);

  return (
    <Card className="bg-[var(--primary-2)] hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{submission.title}</CardTitle>
        <CardDescription>by {teamName}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-[var(--primary-11)] line-clamp-3">
          {submission.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {submission.githubUrl && (
            <Badge
              variant="outline"
              className="bg-[var(--primary-3)] text-[var(--primary-11)]"
            >
              GitHub Repo
            </Badge>
          )}
          {submission.demoUrl && (
            <Badge
              variant="outline"
              className="bg-[var(--primary-3)] text-[var(--primary-11)]"
            >
              Live Demo
            </Badge>
          )}
          {submission.videoUrl && (
            <Badge
              variant="outline"
              className="bg-[var(--primary-3)] text-[var(--primary-11)]"
            >
              Video Demo
            </Badge>
          )}
          {submission.imageUrls && submission.imageUrls.length > 0 && (
            <Badge
              variant="outline"
              className="bg-[var(--primary-3)] text-[var(--primary-11)]"
            >
              {submission.imageUrls.length} Images
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-[var(--muted-foreground)] justify-between">
        <span>
          Submitted{" "}
          {formatDistanceToNow(new Date(submission.submittedAt), {
            addSuffix: true,
          })}
        </span>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = "bg-[var(--primary-3)]";
  let textColor = "text-[var(--primary-11)]";
  let icon = <Clock className="w-3 h-3 mr-1" />;

  switch (status) {
    case "UPCOMING":
      break;
    case "LIVE":
      bgColor = "bg-[var(--primary-9)]";
      textColor = "text-[var(--primary-1)]";
      icon = <CheckCircle className="w-3 h-3 mr-1" />;
      break;
    case "COMPLETED":
      bgColor = "bg-[var(--primary-5)]";
      textColor = "text-[var(--primary-11)]";
      break;
    default:
      break;
  }

  return (
    <Badge variant="outline" className={`${bgColor} ${textColor}`}>
      {icon}
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </Badge>
  );
}

function TeamSizePieChart({
  teamsData,
  maxTeamSize,
}: {
  teamsData: Team[];
  maxTeamSize: number;
}) {
  // Calculate team size distribution
  const distribution = Array(maxTeamSize).fill(0);
  teamsData.forEach((team) => {
    const size = Math.min(team.TeamMember.length, maxTeamSize);
    distribution[size - 1]++;
  });

  // This is a simple representation - in a real app you'd use a proper chart library
  return (
    <div className="space-y-2">
      <div className="flex items-end h-20 gap-1">
        {distribution.map((count, index) => (
          <div
            key={index}
            className="flex-1 bg-[var(--primary-9)] rounded-t flex flex-col justify-end"
            style={{
              height: `${count ? Math.max(15, (count / Math.max(...distribution)) * 100) : 0}%`,
              opacity: 0.5 + index / (maxTeamSize * 1.5),
            }}
          >
            {count > 0 && (
              <div className="text-center text-xs font-medium py-1 text-white">
                {count}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* X-axis labels */}
      <div className="flex gap-1">
        {distribution.map((_, index) => (
          <div
            key={index}
            className="flex-1 text-center text-xs text-[var(--muted-foreground)]"
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-[var(--muted-foreground)] mt-1">
        Team Size
      </div>
    </div>
  );
}

// Helper functions
function getInitials(name: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

function calculateAverageTeamSize(teams: Team[]): string {
  if (teams.length === 0) return "0";
  const totalMembers = teams.reduce(
    (sum: number, team: Team) => sum + team.TeamMember.length,
    0,
  );
  return (totalMembers / teams.length).toFixed(1);
}

function getTimelineProgress(
  date: string,
  startDate: string,
  endDate: string,
): number {
  const now = new Date().getTime();
  const targetDate = new Date(date).getTime();
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  if (now < start) return 0;
  if (now > end) return 100;

  // Calculate where the date falls in the timeline
  const totalDuration = end - start;
  const targetPosition = ((targetDate - start) / totalDuration) * 100;

  return Math.max(0, Math.min(100, targetPosition));
}
