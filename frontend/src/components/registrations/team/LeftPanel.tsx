"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus } from "lucide-react";
import { buttonVariants } from "@/lib/animation";

export default function LeftPanel({
  activeOption,
  setActiveOption,
}: {
  activeOption: "create" | "join";
  setActiveOption: (option: "create" | "join") => void;
}) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader className="bg-transparent text-[var(--primary-9)]">
          <CardTitle className="text-xl font-semibold">Team Options</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col p-2">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                variant={activeOption === "create" ? "default" : "ghost"}
                className={`justify-start text-left mb-2 w-full ${
                  activeOption === "create"
                    ? "bg-[var(--primary-9)] text-white"
                    : ""
                }`}
                onClick={() => setActiveOption("create")}
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create Team
              </Button>
            </motion.div>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <Button
                variant={activeOption === "join" ? "default" : "ghost"}
                className={`justify-start text-left w-full ${
                  activeOption === "join"
                    ? "bg-[var(--primary-9)] text-white"
                    : ""
                }`}
                onClick={() => setActiveOption("join")}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Join Team
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
