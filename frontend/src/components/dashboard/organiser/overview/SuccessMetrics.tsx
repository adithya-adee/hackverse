import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Hackathon, Submission, Team } from "@/types/core_interfaces";
import {
  calculateSubmissionRate,
  calculateCompletionRate,
  calculateEngagementRate,
  calculateFeedbackCoverage,
} from "@/lib/metrics_calculation";

interface SuccessMetricsCardProps {
  teams: Team[];
  submissions: Submission[];
  hackathons: Hackathon[];
  feedbackCount?: number; // Number of submissions that have received feedback
  timeframe?: number; // Optional timeframe in days for filtering data
}

export function SuccessMetricsCard({
  teams = [],
  submissions = [],
  hackathons = [],
  feedbackCount = 0,
  timeframe,
}: SuccessMetricsCardProps) {
  // Calculate submission rate using our utility function
  const submissionRate = useMemo(
    () => calculateSubmissionRate(teams, submissions, timeframe),
    [teams, submissions, timeframe]
  );

  // Calculate completion rate using our utility function
  const completionRate = useMemo(
    () => calculateCompletionRate(hackathons, submissions),
    [hackathons, submissions]
  );

  // Calculate engagement rate using our utility function
  const engagementRate = useMemo(
    () => calculateEngagementRate(hackathons, submissions, teams),
    [hackathons, submissions, teams]
  );

  // Calculate feedback coverage using our utility function
  const feedbackCoverage = useMemo(
    () => calculateFeedbackCoverage(submissions, feedbackCount),
    [submissions, feedbackCount]
  );

  return (
    <Card className="lg:col-span-2 bg-[var(--primary-1)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Success Metrics</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-[var(--muted-foreground)]" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  These metrics show your hackathon performance across all
                  events. Updated in real-time based on participant actions.
                  {timeframe
                    ? ` Showing data from the last ${timeframe} days.`
                    : ""}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Key performance indicators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">
              Participant Engagement
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3 w-3 inline ml-1 text-[var(--muted-foreground)]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Measures how actively teams participated throughout the
                      hackathon duration
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span className="text-sm font-medium">{engagementRate}%</span>
          </div>
          <div className="w-full bg-[var(--primary-3)] rounded-full h-2">
            <div
              className="bg-[var(--primary-9)] h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${engagementRate}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">
              Submission Rate
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3 w-3 inline ml-1 text-[var(--muted-foreground)]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of teams that submitted their projects</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span className="text-sm font-medium">{submissionRate}%</span>
          </div>
          <div className="w-full bg-[var(--primary-3)] rounded-full h-2">
            <div
              className="bg-[var(--primary-8)] h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${submissionRate}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">
              Completion Rate
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3 w-3 inline ml-1 text-[var(--muted-foreground)]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Percentage of hackathons successfully completed with
                      submissions
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span className="text-sm font-medium">{completionRate}%</span>
          </div>
          <div className="w-full bg-[var(--primary-3)] rounded-full h-2">
            <div
              className="bg-[var(--primary-10)] h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">
              Feedback Coverage
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3 w-3 inline ml-1 text-[var(--muted-foreground)]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of submissions that received feedback</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            <span className="text-sm font-medium">{feedbackCoverage}%</span>
          </div>
          <div className="w-full bg-[var(--primary-3)] rounded-full h-2">
            <div
              className="bg-[var(--primary-7)] h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${feedbackCoverage}%` }}
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
  );
}
