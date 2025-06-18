import React from "react";
import { RefreshCcw, Loader2, Filter, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SubmissionCard } from "./SubmissionsCard";
import { Submission } from "@/types/core_interfaces";

interface SubmissionsTabProps {
  filteredSubmissions: Submission[];
  submissionsLoading: boolean;
  submissionsError: any;
  refetchSubmissions: () => void;
  searchQuery: string;
}

export const SubmissionsTab: React.FC<SubmissionsTabProps> = ({
  filteredSubmissions,
  submissionsLoading,
  submissionsError,
  refetchSubmissions,
  searchQuery,
}) => {
  const router = useRouter();
  const [sortBy, setSortBy] = React.useState<"recent" | "oldest" | "rating">(
    "recent"
  );
  const [filterStatus, setFilterStatus] = React.useState<
    "all" | "reviewed" | "pending"
  >("all");

  // Filter submissions based on status
  const filteredByStatus = React.useMemo(() => {
    if (filterStatus === "all") return filteredSubmissions;
    if (filterStatus === "reviewed")
      return filteredSubmissions.filter((s) => s.Rating && s.Rating.length > 0);
    if (filterStatus === "pending")
      return filteredSubmissions.filter(
        (s) => !s.Rating || s.Rating.length === 0
      );
    return filteredSubmissions;
  }, [filteredSubmissions, filterStatus]);

  // Sort submissions
  const sortedSubmissions = React.useMemo(() => {
    if (!filteredByStatus) return [];

    if (filteredByStatus.length < 2) return [...filteredByStatus];
    else
      return [...filteredByStatus].sort((a, b) => {
        if (sortBy === "recent") {
          return (
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime()
          );
        } else if (sortBy === "oldest") {
          return (
            new Date(a.submittedAt).getTime() -
            new Date(b.submittedAt).getTime()
          );
        } else if (sortBy === "rating") {
          // Calculate average rating for each submission
          const avgA =
            (a.Rating && a.Rating.length > 0
              ? a.Rating?.reduce((sum, r) => sum + r.score, 0) /
                a.Rating?.length
              : 0) || 0;
          const avgB =
            (b.Rating && b.Rating.length > 0
              ? b.Rating?.reduce((sum, r) => sum + r.score, 0) /
                b.Rating?.length
              : 0) || 0;
          return avgB - avgA;
        }
        return 0;
      });
  }, [filteredByStatus, sortBy]);

  return (
    <Card className="bg-[var(--primary-1)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            Review and manage hackathon submissions
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-[var(--primary-7)]">
                <Filter className="h-4 w-4 mr-2" />
                {filterStatus === "all"
                  ? "All Status"
                  : filterStatus === "reviewed"
                    ? "Reviewed"
                    : "Pending"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("reviewed")}>
                Reviewed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("pending")}>
                Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-[var(--primary-7)]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                Oldest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("rating")}>
                Highest Rated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {submissionsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-9)]" />
          </div>
        ) : submissionsError ? (
          <div className="text-center py-8 text-[var(--destructive)]">
            <p>Failed to load submission data</p>
            <Button
              onClick={refetchSubmissions}
              variant="outline"
              className="mt-2"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : sortedSubmissions?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedSubmissions.map((submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-[var(--muted-foreground)]">
            <p>No submissions found</p>
            {searchQuery && (
              <p className="mt-2">Try adjusting your search query</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
