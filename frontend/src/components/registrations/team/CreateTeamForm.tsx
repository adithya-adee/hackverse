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

interface Props {
  hackathonId: string;
  setTeamId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function CreateTeamForm({ hackathonId, setTeamId }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTeamCreated, setIsTeamCreated] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

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

  const onSubmit = (data: CreateTeamValues) => {
    console.log(data);
    setIsSubmitting(true);

    //TODO: Create Team and set TeamCreated true.
    //put teamid got after creating in setTeamId
    setTimeout(() => {
      setIsSubmitting(false);
      setIsTeamCreated(true);
      setIsEditing(false);
      const demoTeamId = "team-550e8400-e29b-41d4-a716-446655440001";
      setTeamId(demoTeamId);
    }, 1000);

    // form.reset();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-2"
    >
      <div className="h-full">
        <div className="bg-transparent text-[var(--primary-9)] flex items-center justify-between">
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
            className="space-y-6 flex gap-4 w-full border-dashed border-2 px-4 py-2 rounded-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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
