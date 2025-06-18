import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hackathon } from "@/types/core_interfaces";

interface HackathonActionsProps {
  hackathon: Hackathon;
}

export const HackathonActions: React.FC<HackathonActionsProps> = ({
  hackathon,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/events/${hackathon.id}`)}
      >
        View
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => router.push(`/events/${hackathon.id}/edit`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/events/${hackathon.id}/teams`)}
          >
            Manage Teams
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/events/${hackathon.id}/submissions`)}
          >
            Review Submissions
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-[var(--destructive)]">
            Cancel Hackathon
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
