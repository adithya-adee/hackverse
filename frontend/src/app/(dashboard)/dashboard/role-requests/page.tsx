"use client";

import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateRoleRequestMutation } from "@/apiSlice/roleRequestApiSlice";

const roleRequestSchema = z.object({
  roleType: z.enum(["MODERATOR", "ORGANIZER", "ADMIN"]),
  reason: z
    .string()
    .min(50, "Please provide a detailed reason (minimum 50 characters)"),
  supportingUrl: z.string().url("Please provide a valid URL").optional(),
});

type RoleRequestValues = z.infer<typeof roleRequestSchema>;

const AVAILABLE_ROLES = [
  { value: "MODERATOR", label: "Moderator" },
  { value: "ORGANIZER", label: "Organizer" },
  { value: "ADMIN", label: "Admin" },
];

export default function RequestRolePage() {
  const router = useRouter();

  const [createRoleRequest, { isLoading: isSubmitting }] =
    useCreateRoleRequestMutation();

  const form = useForm<RoleRequestValues>({
    resolver: zodResolver(roleRequestSchema),
    defaultValues: {
      roleType: undefined,
      reason: "",
      supportingUrl: "",
    },
  });

  const onSubmit = async (data: RoleRequestValues) => {
    try {
      console.log(data);
      await createRoleRequest(data).unwrap();

      toast.success("Role request submitted", {
        description: "Your request has been submitted for review.",
      });

      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to submit request", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] py-10"
    >
      <div className="container max-w-2xl mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-[var(--primary-12)] mb-2">
              Request a Role
            </h1>
            <p className="text-[var(--muted-foreground)] mb-6">
              Fill out this form to request a new role on the platform
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Role Type *
                </label>
                <Select
                  onValueChange={(value) =>
                    form.setValue(
                      "roleType",
                      value as RoleRequestValues["roleType"]
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.roleType && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.roleType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Reason for Request *
                </label>
                <Textarea
                  {...form.register("reason")}
                  placeholder="Explain why you would be a good fit for this role..."
                  className="min-h-[150px]"
                />
                {form.formState.errors.reason && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.reason.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Supporting URL (Optional)
                </label>
                <Input
                  {...form.register("supportingUrl")}
                  type="url"
                  placeholder="https://your-portfolio-or-relevant-link.com"
                />
                {form.formState.errors.supportingUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.supportingUrl.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--primary-9)] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          </motion.div>
        </Card>
      </div>
    </motion.div>
  );
}
