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
import { UsersRoundIcon, Edit } from "lucide-react";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/lib/animation";
import {
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "@/apiSlice/teamApiSlice";
import { toast } from "sonner";

interface Props {
  hackathonId: string;
  teamId: string | undefined;
  setTeamId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function CreateTeamForm({
  hackathonId,
  teamId,
  setTeamId,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTeamCreated, setIsTeamCreated] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [createTeam, { isLoading: isCreatingTeam }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isupdatingTeam }] = useUpdateTeamMutation();

  const form = useForm<CreateTeamValues>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      description: "",
      hackathonId: hackathonId,
      lookingForMembers: false,
      requiredSkills: "",
    },
  });

  const onSubmit = async (data: CreateTeamValues) => {
    try {
      setIsSubmitting(true);
      if (isTeamCreated) {
        const response = await updateTeam({ teamId, ...data }).unwrap();
        setIsEditing(false);
        console.log("updated------->", response);
      } else {
        const response = await createTeam(data).unwrap();
        setTeamId(response.id);
        setIsTeamCreated(true);
        setIsEditing(false);
        console.log(response);
      }

      toast.success("Team created successfully!");
    } catch (error) {
      console.error("Failed to create team:", error);
      toast.error("Failed to create team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  //TODO:Restrict to only 1 team per participant per hackathon....
  //TODO:make default values filled with team created even on refresh...

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-2 "
    >
      <div className="h-full">
        <div className="bg-transparent text-[var(--primary-9)] items-center justify-between">
          <div className="text-xl font-semibold flex items-center">
            <UsersRoundIcon className="h-5 w-5 mr-2" />
            Create Your Team
          </div>
          {isTeamCreated && !isEditing && (
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
        <div className="p-6">
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex md:flex gap-4 w-full border-dashed border-blue-300/60 shadow-lg backdrop-blur-sm border-2 p-6 rounded-2xl"
            // variants={containerVariants}
            // initial="hidden"
            // animate="visible"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{
              scale: 1.01,
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
          >
            <div className="grid grid-cols-1 gap-2 w-[50%]">
              <motion.div variants={itemVariants}>
                <Label
                  htmlFor="name"
                  className="text-[var(--primary-12)] mb-1 block"
                >
                  Team Name <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Name your team"
                  {...form.register("name")}
                  className="w-full bg-[var(--primary-2)]"
                  disabled={!isEditing}
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
                  className="text-[var(--primary-12)]  mb-1 block"
                >
                  Required Skills (comma separated)
                </Label>
                <Input
                  id="requiredSkills"
                  placeholder="React, Node.js, TypeScript, etc."
                  {...form.register("requiredSkills")}
                  className="w-full bg-[var(--primary-2)]"
                  disabled={!isEditing}
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 relative w-[50%]">
              <motion.div variants={itemVariants}>
                <Label
                  htmlFor="description"
                  className="text-[var(--primary-12)] mb-1 block"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your team and your project idea"
                  {...form.register("description")}
                  className="w-full  bg-[var(--primary-2)]"
                  disabled={!isEditing}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id="lookingForMembers"
                  //make this checkbox blue
                  className={`w-5 h-5 ${form.getValues("lookingForMembers") && "bg-[var(--primary-9)]"}`}
                  checked={form.watch("lookingForMembers")}
                  onCheckedChange={(checked) =>
                    form.setValue("lookingForMembers", checked as boolean)
                  }
                  disabled={!isEditing}
                />
                <Label
                  htmlFor="lookingForMembers"
                  className="text-[var(--primary-12)]"
                >
                  Looking for team members
                </Label>
              </motion.div>

              {isEditing && (
                <motion.div
                  className="w-[25%] flex justify-end absolute -right-0 -bottom-0"
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
                    {isSubmitting
                      ? "Wait"
                      : isTeamCreated
                        ? "Update Team"
                        : "Create Team"}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
