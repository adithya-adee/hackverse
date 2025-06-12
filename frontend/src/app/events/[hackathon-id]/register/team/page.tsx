"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import JoinTeamView from "@/components/registrations/team/JoinTeamSection";
import CreateTeamSection from "@/components/registrations/team/CreateTeamSection";
import RightSectionCreate from "@/components/registrations/team/RightSectionCreate";
import RightSectionJoin from "@/components/registrations/team/RightSectionJoin";
import { useParams } from "next/navigation";
interface Props {}

function Page(props: Props) {
  const {} = props;
  const [activeTab, setActiveTab] = useState<"Create Team" | "Join Team">(
    "Create Team",
  );
  const params = useParams();
  const hackathonId = params["hackathon-id"] as string;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-3)]">
      <div className="mt-18 w-full md:w-[90%] mx-auto grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <div className="shadow-sm rounded-2xl bg-[var(--primary-2)] w-[30%]">
            <div className="flex space-x-8 px-6">
              <motion.button
                type="button"
                onClick={(e) => {
                  setActiveTab("Create Team");
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-full z-50 m-2 p-3 font-bold text-sm rounded-xl ${
                  activeTab === "Create Team"
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Create Team
              </motion.button>
              <motion.button
                type="button"
                onClick={(e) => {
                  setActiveTab("Join Team");
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-full z-50 m-2 p-3 font-bold text-sm rounded-xl ${
                  activeTab === "Join Team"
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Join Team
              </motion.button>
            </div>
          </div>
          <div className="shadow-lg rounded-2xl border-t-[1px] bg-[var(--primary-1)] p-2 my-4 ">
            {activeTab == "Create Team" && (
              <CreateTeamSection hackathonId={hackathonId} />
            )}
            {activeTab == "Join Team" && <JoinTeamView />}
          </div>
        </div>
        <div className="col-span-2 shadow-lg border-t-[1px] rounded-2xl bg-[var(--primary-1)] p-2 my-4 h-screen ">
          {activeTab == "Create Team" && <RightSectionCreate />}
          {activeTab == "Join Team" && <RightSectionJoin />}
        </div>
      </div>
    </div>
  );
}

export default Page;