import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Calendar } from "lucide-react";
import { Submission } from "@/types/core_interfaces";

interface SubmissionCardProps {
  submission: Submission;
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({
  submission,
}) => {
  const router = useRouter();

  // Calculate average rating
  const averageRating = submission.Rating
    ? submission.Rating.reduce((sum, rating) => sum + rating.score, 0) /
      submission.Rating.length
    : null;

  // Format date nicely
  const formattedDate = submission.submittedAt
    ? new Date(submission.submittedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  // Truncate description
  const truncatedDescription =
    submission.description && submission.description.length > 100
      ? `${submission.description.slice(0, 100)}...`
      : submission.description;

  return (
    <Card className="overflow-hidden border border-[var(--primary-6)] hover:shadow-md transition-shadow duration-200">
      <div className="bg-gradient-to-r from-[var(--primary-9)] to-[var(--primary-8)] h-2" />
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-[var(--primary-12)]">
              {submission.title}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </p>
          </div>
          {submission.Rating && submission.Rating.length > 0 ? (
            <div className="flex items-center gap-1 bg-[var(--primary-4)] px-2 py-1 rounded-md">
              <Star className="w-3 h-3 fill-[var(--primary-9)] text-[var(--primary-9)]" />
              <span className="text-xs font-medium">
                {averageRating?.toFixed(1)}/5
              </span>
            </div>
          ) : (
            <Badge
              variant="outline"
              className="bg-[var(--primary-3)] text-[var(--primary-11)]"
            >
              Pending Review
            </Badge>
          )}
        </div>
        <div className="mt-2">
          <p className="text-sm text-[var(--primary-11)]">
            {truncatedDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="text-xs">
              {submission.Team?.name || "Team"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {submission.Hackathon?.title || "Hackathon"}
            </Badge>
          </div>

          <div className="flex gap-2 mt-3">
            {submission.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={() => window.open(submission.githubUrl, "_blank")}
              >
                GitHub
              </Button>
            )}
            {submission.demoUrl && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={() => window.open(submission.demoUrl, "_blank")}
              >
                Demo
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-[var(--primary-2)] p-3 border-t border-[var(--primary-5)]">
        <Button
          size="sm"
          className="w-full bg-[var(--primary-9)] hover:bg-[var(--primary-10)]"
          onClick={() => router.push(`/submission/${submission.id}`)}
        >
          View Details
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};
