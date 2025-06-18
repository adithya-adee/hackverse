"use client";

import React, { JSX, useState, useEffect } from "react";
import {
  Check,
  X,
  Crown,
  User,
  Mail,
  MapPin,
  Code,
  Calendar,
  Clock,
  Loader2,
  Delete,
  AlertTriangle,
  Trash,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  useGetTeamMembersQuery,
  useAcceptTeamRequestMutation,
  useRejectTeamRequestMutation,
  useGetTeamRequestsForATeamByTeamQuery,
  useGetTeamRequestsForATeambyParticipantsQuery,
  useRemoveMemberMutation,
} from "@/apiSlice/teamApiSlice";
import { TeamMember, TeamRequest } from "@/types/core_interfaces";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserInfo {
  mem: boolean;
  user: {
    Uid: string;
    name: string;
    email: string;
    type: string;
    institutionName?: string;
    profileImageUrl?: string;
    Skill?: { id: string; name: string }[];
  };
  isLeader?: boolean;
  joinedAt: string;
  badge: JSX.Element;
  actions?: JSX.Element;
  kick: boolean;
}

interface TeamMemberCardProps {
  isTeamLeader: boolean;
  teamId: string;
}

const TeamMembercard = ({ teamId, isTeamLeader }: TeamMemberCardProps) => {
  // Move dialog state to component level to avoid conditional rendering issues
  const [dialogUserId, setDialogUserId] = useState<string | null>(null);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const {
    data: teamMembers = [],
    isLoading: isLoadingMembers,
    error: membersError,
  } = useGetTeamMembersQuery(teamId);

  const {
    data: teamRequestsByTeam = [],
    isLoading: isLoadingRequestsByTeam,
    error: requestsErrorByteam,
  } = useGetTeamRequestsForATeamByTeamQuery(teamId);

  const {
    data: teamRequestsByParticipants = [],
    isLoading: isLoadingRequestsByParticipants,
    error: requestsErrorByParticipants,
  } = useGetTeamRequestsForATeambyParticipantsQuery(teamId);

  const [removeMember, { isLoading: removing }] = useRemoveMemberMutation();

  const handleRemoveConfirm = async (userId: string) => {
    try {
      console.log(teamId, userId);
      const rel = await removeMember({ teamId, userId }).unwrap();
      toast.success("Left Team successfully");
    } catch (error) {
      console.error("failed:", error);
      toast.error("Failed to remove from team. Please try again.");
    } finally {
      setIsLeaveDialogOpen(false);
    }
  };

  // Accept and reject request mutations
  const [acceptRequest, { isLoading: isAccepting }] =
    useAcceptTeamRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectTeamRequestMutation();

  // Handle accept request with API call
  const handleAcceptRequest = async (userId: string) => {
    try {
      await acceptRequest({ teamId, userId }).unwrap();
      toast.success("Team request accepted successfully");
    } catch (error) {
      console.error("Failed to accept request:", error);
      toast.error("Failed to accept team request");
    }
  };

  // Handle reject request with API call
  const handleRejectRequest = async (userId: string) => {
    try {
      await rejectRequest({ teamId, userId }).unwrap();
      toast.success("Team request rejected successfully");
    } catch (error) {
      console.error("Failed to reject request:", error);
      toast.error("Failed to reject team request");
    }
  };

  // Fixed date formatting to avoid locale inconsistencies
  const formatDate = (dateString: string) => {
    try {
      // Use fixed format that doesn't depend on locale
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    } catch (e) {
      return "Invalid date";
    }
  };

  const isExpiringSoon = (expiresAt: string) => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const diffHours = (expiry - now) / (1000 * 60 * 60);
    return diffHours <= 24 && diffHours > 0;
  };

  // Show loading state for members and requests
  if (
    isLoadingMembers ||
    isLoadingRequestsByTeam ||
    isLoadingRequestsByParticipants
  ) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-9)]"></div>
      </div>
    );
  }

  // Show error state if any
  // if (membersError || requestsErrorByParticipants || requestsErrorByteam) {
  //   return (
  //     <div className="text-center py-12 text-red-500">
  //       <p>Failed to load team data. Please try again.</p>
  //     </div>
  //   );
  // }

  // if (membersError || requestsErrorByParticipants || requestsErrorByteam) {
  //   const error =
  //     membersError || requestsErrorByteam || requestsErrorByParticipants;

  //   if (process.env.NODE_ENV === "development") {
  //     console.error("Team data load error:", error);
  //   }

  //   return (
  //     <div className="text-center py-12">
  //       <div className="bg-red-100 text-red-700/50 px-6 py-4 rounded-lg inline-block shadow-sm">
  //         <h3 className="text-lg font-semibold mb-2"></h3>
  //         <p className="text-sm">
  //           Something went wrong while loading team members or requests.
  //         </p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  const UserCard = ({
    user,
    isLeader,
    joinedAt,
    badge,
    actions,
    mem,
    kick,
  }: UserInfo) => (
    <div
      className={` ${mem ? "dark:bg-white/5 bg-green-100 " : "bg-yellow-50 dark:bg-white/5"}  w-full rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-16 h-16 ring-2 ring-blue-100">
              <AvatarImage src={user.profileImageUrl} alt={user.name} />
              <AvatarFallback>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isLeader && (
              <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                <Crown className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--primary-12)] flex items-center gap-2">
              {user.name}
              {isLeader && (
                <span className="text-sm text-yellow-600 font-medium">
                  Leader
                </span>
              )}
            </h3>
            <div className="flex items-center gap-1 text-[var(--primary-12)] text-sm">
              <User className="w-4 h-4" />
              <span className="capitalize">{user.type.toLowerCase()}</span>
            </div>
          </div>
        </div>
        {badge}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-[var(--primary-12)]">{user.email}</span>
        </div>

        {user.institutionName && (
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="text-sm text-[var(--primary-12)]">
              {user.institutionName}
            </span>
          </div>
        )}

        {joinedAt && (
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-[var(--primary-12)]">
              Joined: {formatDate(joinedAt)}
            </span>
          </div>
        )}

        {user.Skill && user.Skill.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-[var(--primary-12)]">
                Skills:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.Skill.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {actions && (
          <div className="mt-4 pt-4 border-t border-gray-200">{actions}</div>
        )}

        {!isLeader && kick && (
          <Button
            size="sm"
            className="-right-2 -top-4 z-10 absolute items-center gap-2 hover:bg-red-400"
            disabled={removing}
            onClick={() => {
              setDialogUserId(user.Uid);
              setIsLeaveDialogOpen(true);
            }}
          >
            {removing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash className="w-4 h-4" />
            )}
            {removing ? "removing..." : "kick"}
          </Button>
        )}
      </div>
    </div>
  );

  // Add a single AlertDialog that's always in the DOM
  return (
    <div className="bg-[var(--primary-1)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Team Members Section */}
        <div className="flex gap-3 mb-6">
          <div className="flex items-center bg-green-100 p-2 rounded-lg dark:bg-white/10">
            <Check className="w-3 h-3 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-[var(--primary-12)]">
            Team Members ({teamMembers.length})
          </h2>
        </div>
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member: TeamMember) => {
              // Ensure user object has all required properties with defaults
              const userWithDefaults = {
                Uid: member.User?.id || "",
                name: member.User?.name || "Unknown User",
                email: member.User?.email || "No email provided",
                type: member.User?.type || "UNSPECIFIED",
                institutionName: member.User?.institutionName,
                profileImageUrl:
                  member.User?.profileImageUrl || "/default-avatar.png",
                Skill: member.User?.Skill || [],
              };

              return (
                <UserCard
                  key={member.userId}
                  mem={true}
                  user={userWithDefaults}
                  isLeader={member.isLeader}
                  joinedAt={member.joinedAt}
                  badge={
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-300 rounded-full">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Verified
                      </span>
                    </div>
                  }
                  kick={true}
                />
              );
            })}
          </div>
        </div>

        {/* Team Requests Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            {isTeamLeader ? (
              <>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="w-3 h-3 text-yellow-600" />
                </div>
                <h2 className="text-xl font-bold text-[var(--primary-12)]">
                  Pending Requests (
                  {teamRequestsByTeam.length +
                    teamRequestsByParticipants.length}
                  )
                </h2>
              </>
            ) : (
              <>
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="w-3 h-3 text-yellow-600" />
                </div>
                <h2 className="text-xl font-bold text-[var(--primary-12)]">
                  Pending Requests By Team ({teamRequestsByTeam.length})
                </h2>
              </>
            )}
          </div>

          {teamRequestsByTeam.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamRequestsByTeam.map((request: TeamRequest) => {
                // Create a userWithDefaults object with fallback values to handle type safety
                const userWithDefaults = {
                  Uid: request.user?.id || " ",
                  name: request.user?.name || "Unknown User",
                  email: request.user?.email || "No email provided",
                  type: request.user?.type || "UNSPECIFIED",
                  institutionName: request.user?.institutionName || "",
                  profileImageUrl:
                    request.user?.profileImageUrl || "Unkown Url",
                  Skill: request.user?.Skill || [],
                };

                return (
                  <UserCard
                    key={request.userId}
                    mem={false}
                    user={userWithDefaults} // Pass the type-safe user object
                    joinedAt={request.requestedAt}
                    badge={
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-200 rounded-full">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Pending
                          </span>
                        </div>
                        {isExpiringSoon(request.expiresAt) && (
                          <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full text-center">
                            Expires Soon
                          </div>
                        )}
                      </div>
                    }
                    kick={false}
                  />
                );
              })}
            </div>
          )}

          {teamRequestsByParticipants.length > 0 && isTeamLeader && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamRequestsByParticipants.map((request: TeamRequest) => {
                // Create a userWithDefaults object with fallback values to handle type safety
                const userWithDefaults = {
                  Uid: request.user?.id || " ",
                  name: request.user?.name || "Unknown User",
                  email: request.user?.email || "No email provided",
                  type: request.user?.type || "UNSPECIFIED",
                  institutionName: request.user?.institutionName || "",
                  profileImageUrl:
                    request.user?.profileImageUrl || "/default-avatar.png",
                  Skill: request.user?.Skill || [],
                };

                return (
                  <UserCard
                    key={request.userId}
                    mem={false}
                    kick={false}
                    user={userWithDefaults} // Pass the type-safe user object
                    joinedAt={request.requestedAt}
                    badge={
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-200 rounded-full">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            Pending
                          </span>
                        </div>
                        {isExpiringSoon(request.expiresAt) && (
                          <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full text-center">
                            Expires Soon
                          </div>
                        )}
                      </div>
                    }
                    actions={
                      <div className="space-y-3">
                        <div className="text-xs text-gray-500">
                          <div>
                            Requested: {formatDate(request.requestedAt)}
                          </div>
                          <div>Expires: {formatDate(request.expiresAt)}</div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request.userId)}
                            disabled={isAccepting}
                            className="flex-1 bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isAccepting ? (
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.userId)}
                            disabled={isRejecting}
                            className="flex-1 bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isRejecting ? (
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                            Reject
                          </button>
                        </div>
                      </div>
                    }
                  />
                );
              })}
            </div>
          )}

          {teamRequestsByTeam.length == 0 &&
            teamRequestsByParticipants.length == 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-500 mb-2">
                  No Pending Requests
                </h3>
                <p className="text-gray-400">
                  All team requests have been processed.
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Include single AlertDialog instead of conditional ones */}
      <AlertDialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Kick
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to Kick? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (dialogUserId) {
                  handleRemoveConfirm(dialogUserId);
                }
                setDialogUserId(null);
              }}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              disabled={removing}
            >
              {removing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  removing...
                </>
              ) : (
                "Kick"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamMembercard;
