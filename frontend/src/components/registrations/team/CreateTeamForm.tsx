"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const hackathonsData = [
  { id: "1", title: "Hackathon 2023", maxTeamSize: 4 },
  { id: "2", title: "Summer Code Fest", maxTeamSize: 4 },
  { id: "3", title: "Winter Hackathon", maxTeamSize: 5 },
];

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
    >
      <Card className="h-full">
        <CardHeader className="bg-transparent text-[var(--primary-9)]">
          <CardTitle className="text-xl font-semibold flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            Create a New Team
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
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

            <motion.div variants={itemVariants}>
              <Label
                htmlFor="hackathon"
                className="text-[var(--foreground)] mb-1 block"
              >
                Hackathon *
              </Label>
              <Select
                onValueChange={(value) => form.setValue("hackathonId", value)}
                value={form.watch("hackathonId")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a hackathon" />
                </SelectTrigger>
                <SelectContent>
                  {hackathonsData.map((hackathon) => (
                    <SelectItem key={hackathon.id} value={hackathon.id}>
                      {hackathon.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.hackathonId && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.hackathonId.message}
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
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
