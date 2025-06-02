import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export const PendingRequestsSection = ({ count }: { count: number }) => (
  <Card className="shadow-lg border-border bg-card text-card-foreground">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-[var(--chart-1)]">
        <Clock className="w-5 h-5" />
        Pending Requests
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center">
        <div className="text-3xl font-bold text-[var(--foreground)] mb-1">
          {count}
        </div>
        <div className="text-sm text-[var(--muted-foreground)]">
          Team invitations waiting
        </div>
        <Button
          size="sm"
          className="mt-3 bg-[var(--primary-9)] text-white hover:bg-[var(--primary-9)]/90"
        >
          View Requests
        </Button>
      </div>
    </CardContent>
  </Card>
);
