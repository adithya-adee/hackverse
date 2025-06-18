import React from "react";
import { RefreshCcw, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TeamDetailsDialog } from "./TeamDetailsDialog";
import { Team } from "@/types/core_interfaces";
import { useRouter } from "next/navigation";

interface TeamsTabProps {
  filteredTeams: Team[];
  teamsLoading: boolean;
  teamsError: any;
  refetchTeams: () => void;
  searchQuery: string;
}

export const TeamsTab: React.FC<TeamsTabProps> = ({
  filteredTeams,
  teamsLoading,
  teamsError,
  refetchTeams,
  searchQuery,
}) => {
  const router = useRouter();

  return (
    <Card className="bg-[var(--primary-1)]">
      <CardHeader>
        <CardTitle>Teams</CardTitle>
        <CardDescription>
          Manage teams across all your hackathons
        </CardDescription>
      </CardHeader>
      <CardContent>
        {teamsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-9)]" />
          </div>
        ) : teamsError ? (
          <div className="text-center py-8 text-[var(--destructive)]">
            <p>Failed to load teams data</p>
            <Button onClick={refetchTeams} variant="outline" className="mt-2">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : filteredTeams?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Hackathon</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Submission</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.Hackathon?.title || "Unknown"}</TableCell>
                  <TableCell>{team.TeamMember?.length || 0}</TableCell>
                  <TableCell>
                    {team.Submission ? (
                      <Badge
                        variant="secondary"
                        className="bg-[var(--primary-3)] text-[var(--primary-11)]"
                      >
                        Submitted
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-[var(--primary-2)] text-[var(--primary-10)]"
                      >
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/team/${team.id}`)}
                      >
                        View
                      </Button>
                      <TeamDetailsDialog team={team} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-[var(--muted-foreground)]">
            <p>No teams found</p>
            {searchQuery && (
              <p className="mt-2">Try adjusting your search query</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
