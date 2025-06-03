"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Users,
  UserPlus,
  Search,
  ChevronRight,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/lib/animation";

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

const teamsData: Team[] = [
  {
    id: "1",
    name: "Code Wizards",
    description: "Building an AI-powered education platform",
    hackathonId: "1",
    lookingForMembers: true,
    requiredSkills: "React, Node.js, AI",
    TeamMember: [
      { userId: "1", teamId: "1", isLeader: true },
      { userId: "2", teamId: "1", isLeader: false },
    ],
    Hackathon: { id: "1", title: "Hackathon 2023", maxTeamSize: 4 },
  },
  {
    id: "2",
    name: "Web Ninjas",
    description: "Creating a sustainable fashion marketplace",
    hackathonId: "1",
    lookingForMembers: true,
    requiredSkills: "UI/UX, React, Firebase",
    TeamMember: [{ userId: "3", teamId: "2", isLeader: true }],
    Hackathon: { id: "1", title: "Hackathon 2023", maxTeamSize: 4 },
  },
  {
    id: "3",
    name: "Data Dragons",
    description: "Data visualization for climate change",
    hackathonId: "2",
    lookingForMembers: true,
    requiredSkills: "Python, D3.js, Data Science",
    TeamMember: [
      { userId: "4", teamId: "3", isLeader: true },
      { userId: "5", teamId: "3", isLeader: false },
      { userId: "6", teamId: "3", isLeader: false },
    ],
    Hackathon: { id: "2", title: "Summer Code Fest", maxTeamSize: 4 },
  },
  {
    id: "4",
    name: "Mobile Mavericks",
    description: "Healthcare app for remote patients",
    hackathonId: "3",
    lookingForMembers: true,
    requiredSkills: "Flutter, Firebase, UI Design",
    TeamMember: [{ userId: "7", teamId: "4", isLeader: true }],
    Hackathon: { id: "3", title: "Winter Hackathon", maxTeamSize: 5 },
  },
];

export default function JoinTeamView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [joiningTeam, setJoiningTeam] = useState<string | null>(null);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setTeams(teamsData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleJoinTeam = (teamId: string) => {
    setJoiningTeam(teamId);

    // Simulate API call
    setTimeout(() => {
      const team = teams.find((t) => t.id === teamId);
      console.log({
        title: "Team join request sent!",
        description: `Your request to join ${team?.name || "the team"} has been sent.`,
      });
      setJoiningTeam(null);
    }, 1000);
  };

  // Filter teams based on search query
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.description &&
        team.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (team.requiredSkills &&
        team.requiredSkills.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader className="bg-transparent text-[var(--primary-9)]">
          <CardTitle className="text-xl font-semibold flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Join a Team
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
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
              {filteredTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[var(--primary-12)]">
                            {team.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {team.Hackathon?.title || "Unknown Hackathon"}
                          </p>
                        </div>
                        <Badge className="bg-[var(--primary-4)] text-[var(--primary-9)]">
                          <Users className="h-3 w-3 mr-1" />
                          {team.TeamMember.length}/
                          {team.Hackathon?.maxTeamSize || 4}
                        </Badge>
                      </div>

                      {team.description && (
                        <p className="mt-2 text-sm text-gray-600">
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
                            {team.requiredSkills.split(",").map((skill, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <Badge variant="outline" className="text-xs">
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
                                <Avatar className="border-2 border-white h-8 w-8">
                                  <AvatarFallback className="bg-[var(--primary-3)] text-[var(--primary-9)] text-xs">
                                    {String.fromCharCode(65 + i)}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>
                            )
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
                            disabled={joiningTeam === team.id}
                            className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]"
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
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
