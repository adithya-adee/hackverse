import React, { useMemo } from "react";
import {
  ChevronRight,
  Calendar,
  Users,
  Trophy,
  DollarSign,
  Clock,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "./StatsCard";
import { SuccessMetricsCard } from "./SuccessMetrics";
import { BarChartComponent } from "./BarChartComponent";
import {
  Hackathon,
  Team,
  Submission,
  Participant,
} from "@/types/core_interfaces";
import { HackathonStatus } from "@/types/core_enum";

interface OverviewTabProps {
  hackathonData: Hackathon[];
  teamsData: Team[];
  submissionsData: Submission[];
  participantsData: Participant[];
  setActiveTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  hackathonData,
  teamsData,
  submissionsData,
  participantsData,
  setActiveTab,
}) => {
  const router = useRouter();

  // Calculate dashboard metrics
  const hackathonCount = hackathonData?.length || 0;
  const activeHackathons =
    hackathonData?.filter((h) => h.status === HackathonStatus.UPCOMING)
      .length || 0;
  const completedHackathons =
    hackathonData?.filter((h) => h.status === HackathonStatus.COMPLETED)
      .length || 0;
  const teamCount = teamsData?.length || 0;
  const submissionCount = submissionsData?.length || 0;
  const participantCount = participantsData?.length || 0;

  // Calculate total prize money across all hackathons
  const totalPrizeMoney = useMemo(
    () =>
      hackathonData?.reduce(
        (sum: number, hackathon: Hackathon) =>
          sum + (hackathon.HackathonTag?.length || 0),
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
    hackathonData?.forEach((hackathon) => {
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
    submissionsData?.forEach((submission) => {
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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Hackathons"
          value={hackathonCount}
          icon={<Calendar className="h-5 w-5 text-[var(--primary-9)]" />}
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
          icon={<DollarSign className="h-5 w-5 text-[var(--primary-9)]" />}
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
                hackathons={hackathonData}
                submissions={submissionsData}
                teams={teamsData}
                timeRange="6months"
                chartType="participation"
              />
            </div>
          </CardContent>
        </Card>

        <SuccessMetricsCard
          teams={teamsData}
          submissions={submissionsData}
          hackathons={hackathonData}
          feedbackCount={
            submissionsData.filter((submission) =>
              submission.Feedback ? submission?.Feedback.length > 0 : []
            ).length
          }
          timeframe={90} // Show metrics for last 90 days
        />
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
                  ?.filter((h) => h.status === HackathonStatus.UPCOMING)
                  .slice(0, 3)
                  .map((hackathon, i) => (
                    <div
                      key={hackathon.id || i}
                      className="flex items-center justify-between border-b border-[var(--primary-5)] pb-2 last:border-0"
                    >
                      <div>
                        <p className="font-medium">
                          {hackathon.title || `Hackathon ${i + 1}`}
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
            <CardDescription>Recent project submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissionCount > 0 ? (
                submissionsData?.slice(0, 3).map((submission, i) => (
                  <div
                    key={submission.id || i}
                    className="flex items-center justify-between border-b border-[var(--primary-5)] pb-2 last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        {submission.title || `Project ${i + 1}`}
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
    </div>
  );
};
