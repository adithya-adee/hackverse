import React from "react";
import { Badge } from "@/components/ui/badge";

interface HackathonStatusBadgeProps {
  status: string;
}

export const HackathonStatusBadge: React.FC<HackathonStatusBadgeProps> = ({
  status,
}) => {
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
};
