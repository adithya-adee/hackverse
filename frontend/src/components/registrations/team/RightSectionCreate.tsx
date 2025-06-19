//this will contain all the register users for that hackathon & team joining reqs
//V2: also include past members

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Mail,
  Building,
  Calendar,
  UserPlus,
  LucideUserRoundSearch,
} from "lucide-react";
import { useGetAllParticipantsQuery } from "@/apiSlice/registrationsApiSlice";
import { HackathonRegistration } from "@/types/core_interfaces";
import { useCreateTeamRequestMutation } from "@/apiSlice/teamApiSlice";
import { toast } from "sonner";
interface Props {
  hackathonId: string;
  teamId: string | undefined;
  isLeader: boolean;
  isTeamCreated: boolean;
}

function RightSectionCreate({
  hackathonId,
  teamId,
  isLeader,
  isTeamCreated,
}: Props) {
  const {
    data: registrations,
    isLoading,
    isError,
  } = useGetAllParticipantsQuery(hackathonId);

  const [createTeamRequest, { isLoading: isRequestCreating }] =
    useCreateTeamRequestMutation();

  const onSendTeamRequest = async (userId: string) => {
    const createdReq = await createTeamRequest({
      userId,
      teamId,
      isSentByTeam: true,
    });
    if (!createdReq) {
      toast.error("Team Request failed.");
    }
    toast.success("Team joining request sent successfully");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">Registered Participants</h3>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full  backdrop-blur-sm">
      <div className="p-6">
        <div className="bg-transparent text-[var(--primary-9)] flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LucideUserRoundSearch className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Registered Participants</h3>
          </div>
          <Badge variant="secondary" className="text-xs bg-green-400/50">
            {registrations.length} registered
          </Badge>
        </div>

        {registrations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No participants registered yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Be the first to register for this hackathon!
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 max-h-[calc(100vh-200px)] h-[500px] overflow-y-auto p-2 scrollbar-hide"
          >
            {registrations.map(
              (registration: HackathonRegistration, index: number) => (
                <motion.div
                  key={registration.userId}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group bg-[var(--primary-2)] rounded-2xl"
                >
                  <div className="relative p-5 border-[1px] rounded-2xl transition-all duration-200 hover:shadow-md border-border/50 ">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={registration.User.profileImageUrl}
                              alt={registration.User.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {getInitials(registration.User.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base font-semibold truncate">
                              {registration.User.name}
                            </CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                              <Badge
                                variant={
                                  registration.User.type === "PROFESSIONAL"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {registration.User.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined {formatDate(registration.User.createdAt)}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="truncate">
                            {registration.User.email}
                          </span>
                        </div>

                        {registration.User.institutionName && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3.5 w-3.5" />
                            <span className="truncate">
                              {registration.User.institutionName}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="absolute right-2 bottom-4 ">
                        {isLeader && (
                          <Button
                            size="sm"
                            onClick={() =>
                              onSendTeamRequest?.(registration.User.id)
                            }
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <UserPlus className="h-3.5 w-3.5 mr-1" />
                            Invite
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default RightSectionCreate;
