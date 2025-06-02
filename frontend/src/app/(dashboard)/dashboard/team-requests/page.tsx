"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Calendar, Mail, Check, X } from "lucide-react";

import { HackathonStatus } from "@/types/core_enum";
import { Button } from "@/components/ui/button";
import { useGetTeamRequestsQuery } from "@/apiSlice/userApiSlice";
import { TeamRequest } from "@/types/core_interfaces";
import { formatDateTime, getUserInitials } from "@/lib/formatters";

interface TeamRequestProps {
  teamId: string;
  userId: string;
  requestedAt: string;
  expiresAt: string;
  user: {
    name: string;
    email: string;
    profileImageUrl: string;
  };
  team: {
    id: string;
    name: string;
    description?: string;
    hackathonId: string;
    createdById: string;
    lookingForMembers: boolean;
    requiredSkills?: string;
    createdAt: string;
    updatedAt: string;
    Hackathon: {
      id: string;
      title: string;
      startDate?: string;
      endDate?: string;
      status?: HackathonStatus;
    };
  };
}

function getStatusConfig(status?: string) {
  switch (status) {
    case "ONGOING":
      return {
        variant: "default" as const,
        className: "bg-[var(--primary-9)] text-white border-[var(--primary-9)]",
        icon: "🟢",
      };
    case "UPCOMING":
      return {
        variant: "secondary" as const,
        className: "bg-[var(--primary-8)] text-white border-[var(--primary-8)]",
        icon: "🔵",
      };
    case "COMPLETED":
      return {
        variant: "outline" as const,
        className:
          "bg-[var(--primary-6)] text-[var(--primary-12)] border-[var(--primary-6)]",
        icon: "⚫",
      };
    default:
      return {
        variant: "outline" as const,
        className:
          "bg-[var(--primary-3)] text-[var(--primary-12)] border-[var(--primary-3)]",
        icon: "⚪",
      };
  }
}

function RequestTable({
  team_request,
}: {
  team_request: TeamRequest[] | undefined;
}) {
  return (
    <Card className="w-full max-w-7xl mx-auto shadow-2xl border-0 bg-[var(--primary-1)]/95 backdrop-blur-sm">
      <CardHeader className=" text-[var(--primary-12)] rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <Users className="h-6 w-6" />
          Team Requests Overview
        </CardTitle>
        <p className="text-[var(--primary-11)] mt-2">
          Manage and track team join requests across all hackathons
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className=" border-b-2 border-[var(--primary-6)] ">
                <TableHead className="font-bold text-[var(--primary-12)] py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Team
                  </div>
                </TableHead>
                <TableHead className="font-bold text-[var(--primary-12)] py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Requester
                  </div>
                </TableHead>
                <TableHead className="font-bold text-[var(--primary-12)] py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Hackathon
                  </div>
                </TableHead>
                {/* <TableHead className="font-bold text-[var(--primary-12)] py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Requested
                  </div>
                </TableHead>
                <TableHead className="font-bold text-[var(--primary-12)] py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Expires
                  </div>
                </TableHead> */}
                <TableHead className="font-bold text-[var(--primary-12)] py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    Status
                  </div>
                </TableHead>
                <TableHead>
                  <div className="font-bold text-[var(--primary-12)] py-4 px-6 text-center">
                    Accept/Reject
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!team_request || team_request.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-16 text-[var(--primary-10)]"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <Users className="h-12 w-12 text-[var(--primary-3)]" />
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--primary-12)]">
                          No team requests found
                        </h3>
                        <p className="text-sm text-[var(--primary-10)] mt-1">
                          Team join requests will appear here when submitted
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                team_request.map((request, index) => {
                  const statusConfig = getStatusConfig(
                    request.team?.Hackathon?.status
                  );

                  return (
                    <TableRow
                      key={request.userId + request.teamId}
                      className="border-b border-[var(--primary-4)] hover:bg-[var(--primary-2)]/80 transition-all duration-200 group"
                    >
                      <TableCell className="py-4 px-6">
                        <div>
                          <div className="font-semibold text-[var(--primary-12)] group-hover:text-[var(--primary-9)] transition-colors">
                            {request.team?.name}
                          </div>
                          {request.team?.description && (
                            <div className="text-sm text-[var(--primary-10)] mt-1 truncate max-w-48">
                              {request.team.description}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 ring-2 ring-[var(--primary-4)] group-hover:ring-[var(--primary-8)] transition-all">
                            <AvatarImage src={request.user?.profileImageUrl} />
                            <AvatarFallback className="bg-gradient-to-br from-[var(--primary-9)] to-[var(--primary-8)] text-white text-xs font-semibold">
                              {getUserInitials(
                                request.user?.name,
                                request.user?.email
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-[var(--primary-12)]">
                              {request.user?.name || "Anonymous"}
                            </div>
                            <div className="text-sm text-[var(--primary-10)]">
                              {request.user?.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-6">
                        <div>
                          <div className="font-medium text-[var(--primary-11)]">
                            {request.team?.Hackathon?.title}
                          </div>
                          {request.team?.Hackathon?.startDate && (
                            <div className="text-sm text-[var(--primary-10)] mt-1">
                              Starts:{" "}
                              {formatDateTime(request.team.Hackathon.startDate)}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* <TableCell className="py-4 px-6 text-[var(--primary-12)]">
                        <div className="font-mono text-sm">
                          {formatDateTime(request.requestedAt)}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-6 text-[var(--primary-12)]">
                        <div className="font-mono text-sm">
                          {formatDateTime(request.expiresAt)}
                        </div>
                      </TableCell> */}

                      <TableCell className="py-4 px-6 text-center">
                        <div className="hover:scale-105 transition-transform duration-200">
                          <Badge
                            variant={statusConfig.variant}
                            className={`${statusConfig.className} font-medium px-3 py-1 text-xs transition-all duration-200 shadow-sm hover:shadow-md`}
                          >
                            <span className="mr-1">{statusConfig.icon}</span>
                            {request.team?.Hackathon?.status || "Unknown"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          className="text-sm text-[var(--primary-10)] mt-1 mx-1"
                        >
                          <Check />
                        </Button>
                        <Button
                          variant="outline"
                          className="text-sm text-[var(--primary-10)] mt-1 mx-1"
                        >
                          <X />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamRequestsPage() {
  const { data: team_request, isLoading, error } = useGetTeamRequestsQuery();

  // Add loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-[var(--primary-9)] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-[var(--primary-11)] text-lg">
            Loading team requests...
          </p>
        </div>
      </div>
    );
  }

  // Add error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] flex flex-col items-center justify-center">
        <div className="text-center bg-red-50 p-6 rounded-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-red-700 text-xl font-semibold mb-2">
            Error Loading Team Requests
          </h2>
          <p className="text-red-600 mb-4">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] flex flex-col items-center justify-start p-8 mt-[4rem]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--primary-12)] tracking-tight mb-3">
          Team Requests Dashboard
        </h1>
        <p className="text-[var(--primary-10)] text-lg max-w-2xl mx-auto">
          Monitor and manage team join requests across all your hackathons in
          one place
        </p>
      </div>

      <div className="w-full">
        <RequestTable
          team_request={
            team_request
              ? Array.isArray(team_request)
                ? team_request
                : [team_request]
              : undefined
          }
        />
      </div>
    </div>
  );
}

export default TeamRequestsPage;
