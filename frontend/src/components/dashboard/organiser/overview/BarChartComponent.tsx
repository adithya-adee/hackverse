import React, { useMemo } from "react";
import { Hackathon, Submission, Team } from "@/types/core_interfaces";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HackathonStatus } from "@/types/core_enum";

interface BarChartComponentProps {
  hackathons: Hackathon[];
  submissions: Submission[];
  teams: Team[];
  timeRange?: "3months" | "6months" | "year" | "all";
  chartType?: "participation" | "timeline" | "activity";
  onTimeRangeChange?: (range: "3months" | "6months" | "year" | "all") => void;
}

/**
 * Enhanced Bar Chart component that can visualize different metrics across hackathons
 * with time-based filtering and pagination for large datasets
 */
export const BarChartComponent: React.FC<BarChartComponentProps> = ({
  hackathons,
  submissions,
  teams,
  timeRange = "6months",
  chartType = "participation",
  onTimeRangeChange,
}) => {
  const [selectedRange, setSelectedRange] = React.useState<
    "3months" | "6months" | "year" | "all"
  >(timeRange);
  const [chartOffset, setChartOffset] = React.useState(0);
  const [selectedChartType, setSelectedChartType] = React.useState<
    "participation" | "timeline" | "activity"
  >(chartType);

  // Handle time range changes
  const handleRangeChange = (value: "3months" | "6months" | "year" | "all") => {
    setSelectedRange(value);
    setChartOffset(0); // Reset offset when changing time range
    if (onTimeRangeChange) {
      onTimeRangeChange(value);
    }
  };

  // Calculate the date filter cutoff based on selected range
  const dateFilterCutoff = useMemo(() => {
    const now = new Date();
    switch (selectedRange) {
      case "3months":
        return new Date(now.setMonth(now.getMonth() - 3));
      case "6months":
        return new Date(now.setMonth(now.getMonth() - 6));
      case "year":
        return new Date(now.setFullYear(now.getFullYear() - 1));
      case "all":
        return new Date(0); // Beginning of time
      default:
        return new Date(now.setMonth(now.getMonth() - 6));
    }
  }, [selectedRange]);

  // Filter hackathons based on selected time range
  const filteredHackathons = useMemo(() => {
    return hackathons
      .filter((hackathon) => {
        if (!hackathon.startDate) return false;
        const startDate = new Date(hackathon.startDate);
        return startDate >= dateFilterCutoff;
      })
      .sort((a, b) => {
        if (!a.startDate || !b.startDate) return 0;
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      });
  }, [hackathons, dateFilterCutoff]);

  // Number of hackathons to show per page
  const itemsPerPage = 6;
  const maxPages = Math.ceil(filteredHackathons.length / itemsPerPage);

  // Get visible hackathons based on pagination
  const visibleHackathons = useMemo(() => {
    const startIndex = chartOffset * itemsPerPage;
    return filteredHackathons.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredHackathons, chartOffset, itemsPerPage]);

  // Calculate chart data based on selected chart type
  const chartData = useMemo(() => {
    return visibleHackathons.map((hackathon) => {
      const hackathonTeams = teams.filter(
        (team) => team.hackathonId === hackathon.id
      );
      const hackathonSubmissions = submissions.filter(
        (sub) => sub.hackathonId === hackathon.id
      );

      // Format hackathon name for display
      const displayName = hackathon.title
        ? hackathon.title.length > 10
          ? hackathon.title.substring(0, 8) + "..."
          : hackathon.title
        : "Unnamed";

      // Calculate metrics based on chart type
      let participationMetric = 0;
      let submissionMetric = 0;

      switch (selectedChartType) {
        case "participation":
          // Raw counts
          participationMetric = hackathonTeams.length;
          submissionMetric = hackathonSubmissions.length;
          break;

        case "timeline":
          // Time-based completion metrics
          if (hackathon.startDate && hackathon.endDate) {
            const startDate = new Date(hackathon.startDate);
            const endDate = new Date(hackathon.endDate);
            const hackathonDuration = endDate.getTime() - startDate.getTime();

            // Average time to submission relative to hackathon duration
            let submissionTimeSum = 0;
            let submissionTimeCount = 0;

            hackathonSubmissions.forEach((submission) => {
              if (submission.submittedAt) {
                const submissionDate = new Date(submission.submittedAt);
                const timeFromStart =
                  submissionDate.getTime() - startDate.getTime();
                if (timeFromStart >= 0) {
                  // As percentage of hackathon duration (0-100)
                  submissionTimeSum += Math.min(
                    100,
                    (timeFromStart / hackathonDuration) * 100
                  );
                  submissionTimeCount++;
                }
              }
            });

            submissionMetric = submissionTimeCount
              ? submissionTimeSum / submissionTimeCount
              : 0;
            participationMetric = hackathonTeams.length
              ? (hackathonSubmissions.length / hackathonTeams.length) * 100
              : 0;
          }
          break;

        case "activity":
          // Activity metrics (early vs late submissions)
          if (hackathon.startDate && hackathon.endDate) {
            const startDate = new Date(hackathon.startDate);
            const endDate = new Date(hackathon.endDate);
            const hackathonDuration = endDate.getTime() - startDate.getTime();
            const halfwayPoint = new Date(
              startDate.getTime() + hackathonDuration / 2
            );

            // Count early and late submissions
            const earlySubmissions = hackathonSubmissions.filter((sub) => {
              if (!sub.submittedAt) return false;
              const subDate = new Date(sub.submittedAt);
              return subDate < halfwayPoint;
            }).length;

            const lateSubmissions =
              hackathonSubmissions.length - earlySubmissions;

            participationMetric = earlySubmissions;
            submissionMetric = lateSubmissions;
          }
          break;
      }

      return {
        name: displayName,
        id: hackathon.id,
        participationMetric,
        submissionMetric,
        startDate: hackathon.startDate,
        status: hackathon.status,
      };
    });
  }, [visibleHackathons, submissions, teams, selectedChartType]);

  // Find the maximum value for scaling the chart
  const maxValue = useMemo(() => {
    return Math.max(
      ...chartData.map((d) =>
        Math.max(d.participationMetric, d.submissionMetric)
      ),
      1 // Ensure we always have a non-zero max
    );
  }, [chartData]);

  // Handle navigation
  const handlePrev = () => {
    setChartOffset((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setChartOffset((prev) => Math.min(maxPages - 1, prev + 1));
  };

  // Get chart labels based on chart type
  const getChartLabels = () => {
    switch (selectedChartType) {
      case "participation":
        return { primary: "Teams", secondary: "Submissions" };
      case "timeline":
        return { primary: "Completion %", secondary: "Submission Timing %" };
      case "activity":
        return { primary: "Early Submissions", secondary: "Late Submissions" };
      default:
        return { primary: "Primary", secondary: "Secondary" };
    }
  };

  const chartLabels = getChartLabels();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--primary-9)] rounded-full"></div>
            <span className="text-sm">{chartLabels.primary}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--primary-5)] rounded-full"></div>
            <span className="text-sm">{chartLabels.secondary}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Select
            value={selectedChartType}
            onValueChange={(value: any) => setSelectedChartType(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="participation">Participation</SelectItem>
              <SelectItem value="timeline">Timeline</SelectItem>
              <SelectItem value="activity">Activity</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedRange}
            onValueChange={(value: any) => handleRangeChange(value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="year">1 Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart navigation controls */}
      {filteredHackathons.length > itemsPerPage && (
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={chartOffset === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="text-sm text-[var(--muted-foreground)]">
            {chartOffset + 1} of {maxPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={chartOffset >= maxPages - 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Chart visualization */}
      <div className="flex-1 flex items-end">
        {chartData.length > 0 ? (
          <div className="flex-1 flex items-end h-full">
            {chartData.map((item) => (
              <div
                key={item.id}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <div className="relative w-full px-1 flex flex-col items-center">
                  <div
                    className="w-full bg-[var(--primary-9)] rounded-t-sm"
                    style={{
                      height: `${(item.participationMetric / maxValue) * 100}%`,
                      maxHeight: "90%",
                      minHeight: item.participationMetric ? "5%" : "0%",
                    }}
                  ></div>
                  <div
                    className="w-full bg-[var(--primary-5)] rounded-t-sm mt-1"
                    style={{
                      height: `${(item.submissionMetric / maxValue) * 100}%`,
                      maxHeight: "90%",
                      minHeight: item.submissionMetric ? "5%" : "0%",
                    }}
                  ></div>
                </div>
                <div className="mt-1 text-center">
                  <span className="text-xs">{item.name}</span>
                  {item.status && (
                    <span
                      className={`block text-[0.65rem] ${
                        item.status === HackathonStatus.LIVE
                          ? "text-[var(--primary-9)]"
                          : item.status === "COMPLETED"
                            ? "text-[var(--primary-7)]"
                            : "text-[var(--muted-foreground)]"
                      }`}
                    >
                      {item.status.toLowerCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex-1 flex items-center justify-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              No data available for the selected time range
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
