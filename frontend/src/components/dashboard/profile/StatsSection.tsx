import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  FileText,
  Trophy,
  Users,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  UserPlus,
} from "lucide-react";

interface Stats {
  totalHackathonsParticipated: number;
  totalSubmissions: number;
  totalTeamsCreated: number;
  totalTeamsJoined: number;
  averageRating: number;
  completedHackathons: number;
  activeHackathons: number;
  wonHackathons: number;
  totalEarnings: number;
}

interface StatBoxProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}

function StatBox({ icon, value, label }: StatBoxProps) {
  return (
    <div className="text-center p-3 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
      <div className="flex items-center justify-center mb-1">{icon}</div>
      <div className="text-2xl font-bold text-[var(--foreground)]">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}

interface StatsSectionProps {
  stats: Stats;
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <Card className="shadow-lg border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[var(--primary-9)]">
          <Trophy className="w-5 h-5" />
          Statistics
        </CardTitle>
        <CardDescription>Your hackathon journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <StatBox
            icon={<Target className="w-4 h-4 text-[var(--primary-9)] mr-1" />}
            value={stats.totalHackathonsParticipated}
            label="Participated"
          />
          <StatBox
            icon={<FileText className="w-4 h-4 text-[var(--primary-9)] mr-1" />}
            value={stats.totalSubmissions}
            label="Submissions"
          />
          <StatBox
            icon={<Users className="w-4 h-4 text-[var(--primary-9)] mr-1" />}
            value={stats.totalTeamsCreated}
            label="Teams Created"
          />
          <StatBox
            icon={<UserPlus className="w-4 h-4 text-[var(--primary-9)] mr-1" />}
            value={stats.totalTeamsJoined}
            label="Teams Joined"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[var(--chart-4)]" />
              <span className="text-sm">Average Rating</span>
            </div>
            <span className="font-semibold text-[var(--foreground)]">
              {stats.averageRating}/5
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[var(--chart-2)]" />
              <span className="text-sm">Completed</span>
            </div>
            <span className="font-semibold text-[var(--foreground)]">
              {stats.completedHackathons}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--primary-9)]" />
              <span className="text-sm">Active</span>
            </div>
            <span className="font-semibold text-[var(--foreground)]">
              {stats.activeHackathons}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[var(--chart-1)]" />
              <span className="text-sm">Won</span>
            </div>
            <span className="font-semibold text-[var(--foreground)]">
              {stats.wonHackathons}
            </span>
          </div>

          <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[var(--chart-2)]" />
              <span className="text-sm">Total Earnings</span>
            </div>
            <span className="font-semibold text-[var(--foreground)]">
              ${stats.totalEarnings.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
