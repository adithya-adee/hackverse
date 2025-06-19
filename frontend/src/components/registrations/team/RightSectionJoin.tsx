//invites sent and invites recieved
"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  useAcceptTeamRequestByPartMutation,
  useGetUserTeamRequestsByTeamQuery,
  useGetUserTeamRequestsByUserQuery,
  useRejectTeamRequestMutation,
} from "@/apiSlice/teamApiSlice";
import { TeamRequest } from "@/types/core_interfaces"; // Adjust import path as needed
import { Clock2Icon, Tag } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  hackathonId: string;
}

interface TeamRequestItemProps {
  request: TeamRequest;
  type: "sent" | "received";
  onAccept?: (teamID: string, userID: string) => void;
  onReject?: (teamID: string, userID: string) => void;
}

function TeamRequestItem({
  request,
  type,
  onAccept,
  onReject,
}: TeamRequestItemProps) {
  const handleAccept = () => {
    if (onAccept) {
      const teamID = request.teamId;
      const userID = request.userId;
      onAccept(teamID, userID);
    }
  };

  const handleReject = () => {
    if (onReject) {
      const teamID = request.teamId;
      const userID = request.userId;
      onReject(teamID, userID);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[var(--primary-3)] border border-[var(--primary-6)] rounded-lg p-3 mb-3 `}
    >
      <div className="relative flex justify-between items-start">
        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-2xl text-[var(--primary-12)] mb-1">
              {request.team?.name || "Team Name"}
            </h4>
            <p className="text-sm text-gray-500 mb-2">
              Leader: {request?.user?.name || "Unknown"}
            </p>
          </div>
          {type === "sent" && (
            <div className="absolute right-1 top-1 text-yellow-400">
              <Clock2Icon />
            </div>
          )}

          <div className="flex justify-between w-full gap-4">
            {request.team?.requiredSkills && (
              <div className="mb-2 flex gap-4">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Tag className="h-3 w-3 mr-1" />
                  <span>Required Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {request.team.requiredSkills
                    .split(",")
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[var(--primary-4)] text-[var(--primary-11)] text-xs rounded-full"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              </div>
            )}
            <p className="absolute right-1 bottom-1 text-xs text-[var(--primary-12)]">
              {new Date(request.requestedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {type === "received" && (
          <div className="flex gap-2 ml-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAccept}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-md transition-colors"
            >
              Accept
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReject}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition-colors"
            >
              Reject
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RightSectionJoin({ hackathonId }: Props) {
  const [activeTab, setActiveTab] = useState<
    "Invites Sent" | "Invites Recieved"
  >("Invites Sent");

  const router = useRouter();

  const { data: AllRequestsByTeams, isLoading: loadingTeamRequests } =
    useGetUserTeamRequestsByTeamQuery(undefined);
  const { data: AllRequestsByUser, isLoading: loadingUserRequests } =
    useGetUserTeamRequestsByUserQuery(undefined);

  const [acceptTeamRequestByPart, { isLoading: accepting }] =
    useAcceptTeamRequestByPartMutation();
  const [rejectTeamRequest, { isLoading: rejecting }] =
    useRejectTeamRequestMutation();

  const handleAcceptRequest = async (teamID: string, userID: string) => {
    const res = await acceptTeamRequestByPart({
      teamId: teamID,
      userId: userID,
    }).unwrap();
    if (!res) {
      toast.error("something went wrong.");
    }
    toast.success("Team Request accepted.");
    router.push(`events/${hackathonId}/register/team`);
  };

  const handleRejectRequest = async (teamID: string, userID: string) => {
    const res = await rejectTeamRequest({
      teamId: teamID,
      userId: userID,
    }).unwrap();
    if (!res) {
      toast.error("something went wrong.");
    }
    toast.success("Team Request accepted.");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Nav buttons */}
      <div className="flex space-x-2 p-2 mb-8">
        <motion.button
          type="button"
          onClick={(e) => {
            setActiveTab("Invites Sent");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`flex-1 p-2 font-bold text-xs rounded-lg transition-colors ${
            activeTab === "Invites Sent"
              ? "bg-[var(--primary-8)] text-[var(--primary-12)]"
              : "text-gray-500 hover:text-gray-700 hover:bg-[var(--gray-4)]"
          }`}
        >
          Invites Sent
        </motion.button>

        <motion.button
          type="button"
          onClick={(e) => {
            setActiveTab("Invites Recieved");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`flex-1 p-2 font-bold text-xs rounded-lg transition-colors ${
            activeTab === "Invites Recieved"
              ? "bg-[var(--primary-8)] text-[var(--primary-12)]"
              : "text-gray-500 hover:text-gray-700 hover:bg-[var(--gray-4)]"
          }`}
        >
          Invites Received
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {activeTab === "Invites Sent" && (
          <div>
            {loadingUserRequests ? (
              <div className="flex justify-center py-4">
                <div className="text-sm text-gray-600"></div>
              </div>
            ) : AllRequestsByUser && AllRequestsByUser.length > 0 ? (
              AllRequestsByUser.map((request: TeamRequest, index: number) => (
                <TeamRequestItem
                  key={`${request.teamId}-${request.userId}-${index}`}
                  request={request}
                  type="sent"
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-600">No invites sent</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "Invites Recieved" && (
          <div>
            {loadingTeamRequests ? (
              <div className="flex justify-center py-4">
                <div className="text-sm text-[var(--gray-11)]">Loading...</div>
              </div>
            ) : AllRequestsByTeams && AllRequestsByTeams.length > 0 ? (
              AllRequestsByTeams.map((request: TeamRequest, index: number) => (
                <TeamRequestItem
                  key={`${request.teamId}-${request.userId}-${index}`}
                  request={request}
                  type="received"
                  onAccept={handleAcceptRequest}
                  onReject={handleRejectRequest}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-[var(--gray-11)]">
                  No invites received
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSectionJoin;
