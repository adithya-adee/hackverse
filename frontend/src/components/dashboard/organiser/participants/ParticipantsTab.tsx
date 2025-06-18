import React from "react";
import {
  RefreshCcw,
  Loader2,
  Filter,
  ArrowUpDown,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ParticipantCard } from "./ParticipantCard";
import { Participant } from "@/types/core_interfaces";

interface ParticipantsTabProps {
  filteredParticipants: Participant[];
  participantsLoading: boolean;
  participantsError: any;
  refetchParticipants: () => void;
  searchQuery: string;
}

export const ParticipantsTab: React.FC<ParticipantsTabProps> = ({
  filteredParticipants,
  participantsLoading,
  participantsError,
  refetchParticipants,
  searchQuery,
}) => {
  const [sortBy, setSortBy] = React.useState<"name" | "recent">("recent");
  const [filterHackathon, setFilterHackathon] = React.useState<string>("all");

  // Get unique hackathon IDs and titles
  const hackathons = React.useMemo(() => {
    const uniqueHackathons = new Map();
    filteredParticipants?.forEach((participant) => {
      if (participant.hackathonId && participant.hackathonTitle) {
        uniqueHackathons.set(
          participant.hackathonId,
          participant.hackathonTitle
        );
      }
    });
    return Array.from(uniqueHackathons).map(([id, title]) => ({ id, title }));
  }, [filteredParticipants]);

  // Filter participants based on selected hackathon
  const filteredByHackathon = React.useMemo(() => {
    if (filterHackathon === "all") return filteredParticipants;
    return filteredParticipants?.filter(
      (p) => p.hackathonId === filterHackathon
    );
  }, [filteredParticipants, filterHackathon]);

  // Sort participants
  const sortedParticipants = React.useMemo(() => {
    if (!filteredByHackathon) return [];

    return [...filteredByHackathon].sort((a, b) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      } else if (sortBy === "recent") {
        return (
          new Date(b.registeredAt || "").getTime() -
          new Date(a.registeredAt || "").getTime()
        );
      }
      return 0;
    });
  }, [filteredByHackathon, sortBy]);

  // Handle export to CSV
  const exportToCSV = () => {
    if (!sortedParticipants || sortedParticipants.length === 0) return;

    const headers = [
      "Name",
      "Email",
      "Institution",
      "Hackathon",
      "Registered Date",
      "Skills",
    ];
    const rows = sortedParticipants.map((p) => [
      p.name || "",
      p.email || "",
      p.institutionName || "",
      p.hackathonTitle || "",
      p.registeredAt ? new Date(p.registeredAt).toLocaleDateString() : "",
      p.Skill?.map((s) => s.name).join(", ") || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `participants_${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-[var(--primary-1)]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Participants</CardTitle>
          <CardDescription>
            Track and manage hackathon participants
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-[var(--primary-7)]">
                <Filter className="h-4 w-4 mr-2" />
                {filterHackathon === "all"
                  ? "All Hackathons"
                  : hackathons.find((h) => h.id === filterHackathon)?.title ||
                    "Selected Hackathon"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterHackathon("all")}>
                All Hackathons
              </DropdownMenuItem>
              {hackathons.map((hackathon) => (
                <DropdownMenuItem
                  key={hackathon.id}
                  onClick={() => setFilterHackathon(hackathon.id)}
                >
                  {hackathon.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-[var(--primary-7)]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort: {sortBy === "name" ? "Name" : "Recent"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                Name (A-Z)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {participantsLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-9)]" />
          </div>
        ) : participantsError ? (
          <div className="text-center py-8 text-[var(--destructive)]">
            <p>Failed to load participant data</p>
            <Button
              onClick={refetchParticipants}
              variant="outline"
              className="mt-2"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : sortedParticipants?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedParticipants.map((participant) => (
              <ParticipantCard
                key={
                  participant.id + participant.hackathonId + participant.email
                }
                participant={participant}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-[var(--muted-foreground)]">
            <p>No participants found</p>
            {searchQuery && (
              <p className="mt-2">Try adjusting your search query</p>
            )}
          </div>
        )}
      </CardContent>
      {sortedParticipants?.length > 0 && (
        <CardFooter className="border-t border-[var(--primary-5)] pt-4">
          <Button variant="outline" className="ml-auto" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
