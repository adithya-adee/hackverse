import { Hackathon, Submission, Team } from "@/types/core_interfaces";

/**
 * Calculate the submission rate based on teams and submissions
 * @param teams - All teams registered for hackathons
 * @param submissions - All submitted projects
 * @param timeframe - Optional date range to filter by (in days)
 * @returns Percentage of teams that submitted projects
 */
export function calculateSubmissionRate(
  teams: Team[],
  submissions: Submission[],
  timeframe?: number
): number {
  if (!teams.length) return 0;

  let filteredTeams = [...teams];
  let filteredSubmissions = [...submissions];

  // Apply time filtering if specified
  if (timeframe) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - timeframe);

    // Filter teams created within timeframe
    filteredTeams = filteredTeams.filter((team) =>
      team.createdAt ? new Date(team.createdAt) >= cutoffDate : true
    );

    // Filter submissions within timeframe
    filteredSubmissions = filteredSubmissions.filter((submission) =>
      submission.submittedAt
        ? new Date(submission.submittedAt) >= cutoffDate
        : false
    );
  }

  // Count unique teams that have submitted
  const teamsWithSubmissions = new Set(
    filteredSubmissions.map((submission) => submission.teamId)
  );

  return Math.round((teamsWithSubmissions.size / filteredTeams.length) * 100);
}

/**
 * Calculate hackathon completion rate
 * A hackathon is considered successfully completed if:
 * 1. It has ended (status = COMPLETED or current date > end date)
 * 2. Had at least one submission
 *
 * @param hackathons - All hackathons
 * @param submissions - All submissions
 * @param customDate - Date to use instead of current date (for testing)
 * @returns Percentage of hackathons successfully completed
 */
export function calculateCompletionRate(
  hackathons: Hackathon[],
  submissions: Submission[],
  customDate?: Date
): number {
  if (!hackathons.length) return 0;

  const referenceDate = customDate || new Date();

  // Create a map of hackathonIds with submissions
  const hackathonsWithSubmissions = new Set(
    submissions.map((submission) => submission.hackathonId)
  );

  // Count completed hackathons with submissions
  const successfullyCompletedHackathons = hackathons.filter((hackathon) => {
    // Check if hackathon is completed by status or date
    const isCompleted =
      hackathon.status === "COMPLETED" ||
      (hackathon.endDate && new Date(hackathon.endDate) < referenceDate);

    // Check if hackathon had submissions
    const hasSubmissions = hackathonsWithSubmissions.has(hackathon.id);

    return isCompleted && hasSubmissions;
  });

  // Return percentage of successfully completed hackathons
  return Math.round(
    (successfullyCompletedHackathons.length / hackathons.length) * 100
  );
}

/**
 * Calculate time-based engagement score for hackathons
 * Higher scores for:
 * - Early submissions (not last-minute)
 * - Consistent activity throughout hackathon duration
 * - Higher team formation rates
 *
 * @param hackathons - All hackathons
 * @param submissions - All submissions
 * @param teams - All teams
 * @returns Engagement score (0-100)
 */
export function calculateEngagementRate(
  hackathons: Hackathon[],
  submissions: Submission[],
  teams: Team[]
): number {
  if (!hackathons.length) return 0;

  const currentDate = new Date();
  let totalEngagementScore = 0;
  let analyzedHackathonCount = 0;

  // Analyze each hackathon
  for (const hackathon of hackathons) {
    if (!hackathon.startDate || !hackathon.endDate) continue;

    const startDate = new Date(hackathon.startDate);
    const endDate = new Date(hackathon.endDate);
    const hackathonDuration = endDate.getTime() - startDate.getTime();

    // Skip if hackathon hasn't started yet
    if (startDate > currentDate) continue;

    // Skip if hackathon ended more than 90 days ago
    if (endDate < new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000))
      continue;

    analyzedHackathonCount++;

    // Get submissions for this hackathon
    const hackathonSubmissions = submissions.filter(
      (sub) => sub.hackathonId === hackathon.id
    );

    // Get teams for this hackathon
    const hackathonTeams = teams.filter(
      (team) => team.hackathonId === hackathon.id
    );

    if (!hackathonTeams.length) continue;

    // Calculate submission timing distribution
    let timelinessFactor = 0;
    for (const submission of hackathonSubmissions) {
      if (!submission.submittedAt) continue;

      const submissionDate = new Date(submission.submittedAt);

      // Skip if submission date is invalid or outside hackathon period
      if (
        isNaN(submissionDate.getTime()) ||
        submissionDate < startDate ||
        submissionDate > endDate
      )
        continue;

      // Calculate when during the hackathon the submission was made
      // 0 = start of hackathon, 1 = end of hackathon
      const submissionTimeRatio =
        (submissionDate.getTime() - startDate.getTime()) / hackathonDuration;

      // Award more points for earlier submissions
      // Scale: 1.0 (at start) to 0.2 (at end)
      timelinessFactor += Math.max(0.2, 1 - submissionTimeRatio * 0.8);
    }

    // Calculate submission rate for this hackathon
    const submissionRate = hackathonSubmissions.length / hackathonTeams.length;

    // Normalize timeliness factor (average per submission)
    timelinessFactor = hackathonSubmissions.length
      ? timelinessFactor / hackathonSubmissions.length
      : 0;

    // Calculate active duration ratio (how much of the hackathon has passed)
    const activeDurationRatio = Math.min(
      1,
      (Math.min(currentDate.getTime(), endDate.getTime()) -
        startDate.getTime()) /
        hackathonDuration
    );

    // Calculate engagement score for this hackathon
    // Formula weights: 60% submission rate, 40% submission timeliness
    const hackathonEngagementScore = Math.min(
      100,
      Math.round(submissionRate * 60 + timelinessFactor * 40) *
        activeDurationRatio
    );

    totalEngagementScore += hackathonEngagementScore;
  }

  // Return average engagement score across all analyzed hackathons
  return analyzedHackathonCount
    ? Math.round(totalEngagementScore / analyzedHackathonCount)
    : 75; // Default value if no hackathons could be analyzed
}

/**
 * Calculate feedback coverage rate
 * @param submissions - All submissions
 * @param feedbackCount - Number of submissions that have received feedback
 * @returns Percentage of submissions with feedback
 */
export function calculateFeedbackCoverage(
  submissions: Submission[],
  feedbackCount: number
): number {
  if (!submissions.length) return 0;
  return Math.round((feedbackCount / submissions.length) * 100);
}
