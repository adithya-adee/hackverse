import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Participant } from "@/types/core_interfaces";
import { ExternalLink, Mail, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface ParticipantCardProps {
  participant: Participant;
}

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
}) => {
  const router = useRouter();

  // Format date nicely
  const formattedDate = participant.registeredAt
    ? new Date(participant.registeredAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date";

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={participant.profileImageUrl}
              alt={participant.name}
            />
            <AvatarFallback className="bg-[var(--primary-4)] text-[var(--primary-11)]">
              {participant.name?.charAt(0) || "P"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-[var(--primary-12)]">
              {participant.name}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {participant.email}
            </p>
            <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 mt-0.5">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {participant.institutionName && (
            <p className="text-xs text-[var(--primary-11)]">
              <span className="font-medium">Institution:</span>{" "}
              {participant.institutionName}
            </p>
          )}

          <div>
            <p className="text-xs font-medium mb-1">Skills:</p>
            <div className="flex flex-wrap gap-1">
              {participant.Skill && participant.Skill.length > 0 ? (
                participant.Skill.slice(0, 3).map((skill) => (
                  <Badge key={skill.id} variant="outline" className="text-xs">
                    {skill.name}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-[var(--muted-foreground)]">
                  No skills listed
                </span>
              )}
              {participant.Skill && participant.Skill.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{participant.Skill.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium mb-1">Teams:</p>
            <div className="flex flex-wrap gap-1">
              {participant.teams && participant.teams.length > 0 ? (
                participant.teams.map((team, index) => (
                  <Badge
                    key={team.teamId || index}
                    className={`text-xs ${team.isLeader ? "bg-[var(--primary-5)]" : ""}`}
                    variant="outline"
                  >
                    {team.teamName}
                    {team.isLeader ? " (Leader)" : ""}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-[var(--muted-foreground)]">
                  No teams joined
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-[var(--primary-5)] p-3 bg-[var(--primary-2)]">
        <Button
          size="sm"
          variant="ghost"
          className="text-xs text-[var(--primary-10)] hover:text-[var(--primary-11)]"
          onClick={() => router.push(`/participant/${participant.id}`)}
        >
          View Profile
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="text-xs ml-auto"
          onClick={() => window.open(`mailto:${participant.email}`)}
        >
          Contact
          <Mail className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};
