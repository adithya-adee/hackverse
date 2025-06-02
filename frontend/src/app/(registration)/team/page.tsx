"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import LeftPanel from "@/components/registrations/team/LeftPanel";
import CreateTeamForm from "@/components/registrations/team/CreateTeamForm";
import JoinTeamView from "@/components/registrations/team/JoinTeamForm";

export default function TeamManagementPage() {
  const [activeOption, setActiveOption] = useState<"create" | "join">("create");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] py-10 mt-10"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl font-bold text-[var(--primary-12)] mb-8"
        >
          Team Management
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <LeftPanel
              activeOption={activeOption}
              setActiveOption={setActiveOption}
            />
          </div>

          <div className="md:col-span-3">
            {activeOption === "create" ? <CreateTeamForm /> : <JoinTeamView />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
