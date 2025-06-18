import React from "react";
import { Plus, RefreshCcw, Loader2 } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { HackathonActions } from "./HackhtonsActions";
import { HackathonStatusBadge } from "./HackathonStatusBadge";
import { Hackathon, Team } from "@/types/core_interfaces";

interface HackathonTabProps {
  filteredHackathons: Hackathon[];
  teamsData: Team[];
  hackathonLoading: boolean;
  hackathonError: any;
  refetchHackathons: () => void;
  searchQuery: string;
}

export const HackathonTab: React.FC<HackathonTabProps> = ({
  filteredHackathons,
  teamsData,
  hackathonLoading,
  hackathonError,
  refetchHackathons,
  searchQuery,
}) => {
  const router = useRouter();

  return (
    <Card className="bg-[var(--primary-1)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Hackathons</CardTitle>
          <CardDescription>
            Manage and monitor your hackathon events
          </CardDescription>
        </div>
        <Button
          onClick={() => router.push("/host-hackathon/step1")}
          className="bg-[var(--primary-9)] text-[var(--primary-1)] hover:bg-[var(--primary-5)] transition duration-200 ease-out"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Hackathon
        </Button>
      </CardHeader>
      <CardContent>
        {hackathonLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-9)]" />
          </div>
        ) : hackathonError ? (
          <div className="text-center py-8 text-[var(--destructive)]">
            <p>Failed to load hackathon data</p>
            <Button
              onClick={refetchHackathons}
              variant="outline"
              className="mt-2"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : filteredHackathons?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHackathons.map((hackathon: any) => (
                <TableRow key={hackathon.id}>
                  <TableCell className="font-medium">
                    {hackathon.title}
                  </TableCell>
                  <TableCell>
                    <HackathonStatusBadge status={hackathon.status} />
                  </TableCell>
                  <TableCell>
                    {teamsData.filter(
                      (team) => team.hackathonId === hackathon.id
                    ).length || 0}
                  </TableCell>
                  <TableCell>{hackathon?._count?.Submission || 0}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div>
                        Start:{" "}
                        {hackathon.startDate
                          ? new Date(hackathon.startDate).toLocaleDateString()
                          : "Not set"}
                      </div>
                      <div>
                        End:{" "}
                        {hackathon.endDate
                          ? new Date(hackathon.endDate).toLocaleDateString()
                          : "Not set"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <HackathonActions hackathon={hackathon} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-[var(--muted-foreground)]">
            <p>No hackathons found</p>
            {searchQuery && (
              <p className="mt-2">Try adjusting your search query</p>
            )}
            {!searchQuery && (
              <Button
                onClick={() => router.push("/host-hackathon/step1")}
                variant="outline"
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Hackathon
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
