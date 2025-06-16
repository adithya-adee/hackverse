import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Team, TeamMember } from "@/types/core_interfaces";

interface TeamDetailsDialogProps {
  team: Team;
}

export const TeamDetailsDialog: React.FC<TeamDetailsDialogProps> = ({
  team,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[var(--primary-2)]">
        <DialogHeader>
          <DialogTitle>{team.name}</DialogTitle>
          <DialogDescription>
            {team.Hackathon?.title || "Hackathon"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-medium mb-2">Team Members</h4>
          <div className="space-y-3">
            {team.TeamMember?.map((member) => (
              <div key={member.userId} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={member.User?.profileImageUrl}
                    alt={member.User?.name}
                  />
                  <AvatarFallback className="bg-[var(--primary-4)]">
                    {member.User?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {member.User?.name || "Unknown User"}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {member.isLeader ? "Team Leader" : "Member"}
                  </p>
                </div>
              </div>
            ))}
            {!team.TeamMember?.length && (
              <p className="text-sm text-[var(--muted-foreground)]">
                No members in this team
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
