"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTeamSchema } from "@/schemas/team";
import type { CreateTeamValues } from "@/schemas/team";
import { motion } from "motion/react";
import { PlusCircle } from "lucide-react";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/lib/animation";

export default function CreateTeamForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateTeamValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      description: "",
      hackathonId: "",
      lookingForMembers: true,
      requiredSkills: "",
    },
  });

  const onSubmit = (data: CreateTeamValues) => {
    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      console.log({
        title: "Team created successfully!",
        description:
          "Your team has been created and you are now the team leader.",
      });
      form.reset();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-2"
    >
      <div className="h-full">
        <div className="bg-transparent text-[var(--primary-9)]">
          <div className="text-xl font-semibold flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Your Tean
          </div>
        </div>
        <div className="p-6">
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex gap-4 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1  gap-2 w-[50%]">
              <motion.div variants={itemVariants}>
                <Label
                  htmlFor="name"
                  className="text-[var(--foreground)] mb-1 block"
                >
                  Team Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your team name"
                  {...form.register("name")}
                  className="w-full"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label
                  htmlFor="requiredSkills"
                  className="text-[var(--foreground)] mb-1 block"
                >
                  Required Skills (comma separated)
                </Label>
                <Input
                  id="requiredSkills"
                  placeholder="React, Node.js, TypeScript, etc."
                  {...form.register("requiredSkills")}
                  className="w-full"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-2 w-[50%]">
              <motion.div variants={itemVariants}>
                <Label
                  htmlFor="description"
                  className="text-[var(--foreground)] mb-1 block"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your team and your project idea"
                  {...form.register("description")}
                  className="w-full min-h-[100px]"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id="lookingForMembers"
                  checked={form.watch("lookingForMembers")}
                  onCheckedChange={(checked) =>
                    form.setValue("lookingForMembers", checked as boolean)
                  }
                />
                <Label
                  htmlFor="lookingForMembers"
                  className="text-[var(--foreground)]"
                >
                  Looking for team members
                </Label>
              </motion.div>

              <motion.div
                className="w-[50%] flex justify-end"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  className="w-full bg-[var(--primary-9)] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : null}
                  {isSubmitting ? "Creating..." : "Create Team"}
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
