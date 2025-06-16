"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserPlus, Search, ChevronRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react"; // Fixed motion import
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/lib/animation";
import {
  useGetTeamsLookingForMembersQuery,
  useCreateTeamRequestMutation,
} from "@/apiSlice/teamApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/types/core_interfaces";

interface Team {
  id: string;
  name: string;
  description?: string;
  hackathonId: string;
  lookingForMembers: boolean;
  requiredSkills?: string;
  TeamMember: TeamMember[];
  Hackathon?: {
    id: string;
    title: string;
    maxTeamSize: number;
  };
  User: {
    id: string;
    name: string;
  };
}

interface TeamMember {
  userId: string;
  teamId: string;
  isLeader: boolean;
  user?: {
    name: string;
    profileImageUrl?: string;
  };
}

interface JoinTeamViewProps {
  hackathonId: string;
}

export default function JoinTeamView({ hackathonId }: JoinTeamViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [joiningTeam, setJoiningTeam] = useState<string | null>(null);

  // Get current user from Redux store
  const user: User = useSelector((state: RootState) => state.auth.user);

  // Fetch teams looking for members from API
  const {
    data: teams = [] as Team[],
    isLoading,
    error,
  } = useGetTeamsLookingForMembersQuery(hackathonId);

  // Create team request mutation
  const [createTeamRequest, { isLoading: isCreatingRequest }] =
    useCreateTeamRequestMutation();

  const handleJoinTeam = async (teamId: string) => {
    if (!user?.id) {
      toast.error("You must be logged in to join a team");
      return;
    }

    setJoiningTeam(teamId);

    try {
      const userId = user.id;
      await createTeamRequest({ userId, teamId, isSentByTeam: false }).unwrap();

      toast.success("Join request sent successfully");
    } catch (error) {
      console.error("Failed to join team:", error);
      toast.error("Failed to join team. Please try again.");
    } finally {
      setJoiningTeam(null);
    }
  };

  // Filter teams based on search query
  const filteredTeams = teams.filter(
    (team: Team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.description &&
        team.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (team.requiredSkills &&
        team.requiredSkills.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full">
        <div className="bg-transparent p-2 text-[var(--primary-9)]">
          <div className="text-xl font-semibold flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Join a Team
          </div>
        </div>
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 relative"
          >
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by team name, description or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </motion.div>

          {isLoading ? (
            <div className="text-center py-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-10 w-10 border-4 border-[var(--primary-9)] border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-[var(--primary-11)]">Loading teams...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              <p>Failed to load teams. Please try again.</p>
            </div>
          ) : filteredTeams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10"
            >
              <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No teams found
              </h3>
              <p className="text-gray-500 mt-1">
                Try different search terms or create your own team
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredTeams.map((team: Team, index: number) => (
                <motion.div
                  className="shadow-sm rounded-2xl bg-[var(--primary-2)]"
                  key={team.id}
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.009 }}
                  transition={{ type: "spring", stiffness: 100, damping: 17 }}
                >
                  <div className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--primary-12)]">
                            {team.name}
                          </h3>
                          <div className="flex gap-5">
                            <p className="text-sm text-gray-500">
                              {team.Hackathon?.title || "Unknown Hackathon"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Leader-{team.User?.name || "Unknown Name"}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-[var(--primary-4)] text-[var(--primary-12)]">
                          <Users className="h-3 w-3 mr-1" />
                          {team.TeamMember.length}/
                          {team.Hackathon?.maxTeamSize || 4}
                        </Badge>
                      </div>

                      {team.description && (
                        <p className="mt-2 text-sm text-[var(--primary-12)]">
                          {team.description}
                        </p>
                      )}

                      {team.requiredSkills && (
                        <div className="mt-3">
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Tag className="h-3 w-3 mr-1" />
                            <span>Required Skills:</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {team.requiredSkills
                              .split(",")
                              .map((skill: any, i: number) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-[var(--primary-2)]"
                                  >
                                    {skill.trim()}
                                  </Badge>
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, team.TeamMember.length))].map(
                            (_, i) => (
                              <motion.div
                                key={i}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                              >
                                <Avatar className="border-1 border-white h-8 w-8">
                                  <AvatarFallback className="bg-[var(--primary-3)] text-[var(--primary-9)] text-xs">
                                    {String.fromCharCode(65 + i)}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>
                            ),
                          )}
                          {team.TeamMember.length > 3 && (
                            <motion.div
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              className="h-8 w-8 rounded-full bg-[var(--primary-3)] flex items-center justify-center border-2 border-white text-xs font-medium"
                            >
                              +{team.TeamMember.length - 3}
                            </motion.div>
                          )}
                        </div>

                        <motion.div
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          <Button
                            onClick={() => handleJoinTeam(team.id)}
                            disabled={
                              joiningTeam === team.id || isCreatingRequest
                            }
                            className="bg-[var(--primary-10)] text-white"
                          >
                            {joiningTeam === team.id ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                Join Team
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
