"use client";

import React from "react";
import { animate, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Users,
  Tag,
  Eye,
  FileText,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHackathonForm } from "@/contexts/hackathon-form-context";
import ReactMarkdown from "react-markdown";
import { useCreateMutation } from "@/apiSlice/hackathonApiSlice";
import { formatDate } from "@/lib/formatters";
import { toast } from "sonner";
import Loading from "@/app/loading";

export default function CreateHackathonStep3() {
  const router = useRouter();
  const { formData, resetFormData } = useHackathonForm();
  const [create, { isLoading, isError }] = useCreateMutation();

  const handleSubmit = async () => {
    try {
      const promise = new Promise<string>((resolve, reject) => {
        const { moderatorEmails, ...data } = formData;
        console.log("sending data:", data);
        const data2 = { data };
        create(data2)
          .unwrap()
          .then((result) => {
            console.log(result);
            resetFormData();
            router.push("/events");
            resolve("Successfully created hackathon!");
          })
          .catch((error) => {
            console.error("Error creating hackathon:", error);
            reject("Failed to create hackathon. Please try again.");
          });
      });

      toast.promise(promise, {
        loading: "Creating hackathon...",
        success: (message: string) => message as string,
        error: (message: string) => message as string,
      });
      const { moderatorEmails, ...data } = formData;
      console.log("sending data:", data);
      const data2 = { data };
      const result = await create(data2);
      console.log(result);
      resetFormData();
      router.push("/events");
    } catch (error) {
      console.error("Error creating hackathon:", error);
    }
  };

  const goBack = () => {
    router.push("/host-hackathon/step2");
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-3)] p-6"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl bg-gradient-to-r from-blue-500 to-green-600 text-transparent bg-clip-text font-bold mb-2">
            Review & Create
          </h1>
          <p className="text-[var(--primary-11)]">
            Review all the details before creating your hackathon
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-[var(--primary-3)] border-[var(--primary-6)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--primary-12)]">
                  <FileText className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--primary-12)] mb-2">
                    {formData.title || "Untitled Hackathon"}
                  </h3>
                  <p className="text-[var(--primary-11)]">
                    {formData.description || "No description provided"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--primary-10)]" />
                    <span className="text-[var(--primary-11)]">
                      {formData.mode === "ONLINE"
                        ? "Online"
                        : formData.mode === "OFFLINE"
                          ? `${formData.location || "Location TBD"}`
                          : `Hybrid - ${formData.location || "Location TBD"}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[var(--primary-10)]" />
                    <span className="text-[var(--primary-11)]">
                      Max team size: {formData.maxTeamSize || 4}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--primary-10)]" />
                    <div>
                      <p className="text-sm text-[var(--primary-10)]">
                        Registration Deadline
                      </p>
                      <p className="text-[var(--primary-11)]">
                        {formatDate(formData.registrationDate || "")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--primary-10)]" />
                    <div>
                      <p className="text-sm text-[var(--primary-10)]">
                        Start Date
                      </p>
                      <p className="text-[var(--primary-11)]">
                        {formatDate(formData.startDate || "")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--primary-10)]" />
                    <div>
                      <p className="text-sm text-[var(--primary-10)]">
                        End Date
                      </p>
                      <p className="text-[var(--primary-11)]">
                        {formatDate(formData.endDate || "")}
                      </p>
                    </div>
                  </div>
                </div>

                {formData.bannerImageUrl && (
                  <div>
                    <p className="text-sm text-[var(--primary-10)] mb-2">
                      Banner Image
                    </p>
                    <img
                      src={formData.bannerImageUrl}
                      alt="Hackathon Banner"
                      className="w-full h-48 object-cover rounded-lg border border-[var(--primary-6)]"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Tags */}

          <Card className="bg-[var(--primary-3)] border-[var(--primary-6)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--primary-12)]">
                <Tag className="h-5 w-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {formData.tags && formData.tags.length > 0 ? (
                  formData.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="px-3 py-2 text-xs font-bold rounded-full border"
                    >
                      {tag}
                    </motion.span>
                  ))
                ) : (
                  <p className="text-[var(--primary-10)]">No tags added</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="bg-[var(--primary-3)] border-[var(--primary-6)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--primary-12)]">
                  <Eye className="h-5 w-5" />
                  Content Tabs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.tabs && formData.tabs.length > 0 ? (
                  formData.tabs
                    .filter((tab) => tab.isVisible)
                    .sort((a, b) => a.order - b.order)
                    .map((tab, index) => (
                      <div
                        key={index}
                        className="border border-[var(--primary-6)] rounded-lg p-4"
                      >
                        <h4 className="font-semibold text-[var(--primary-12)] mb-2">
                          {tab.title}
                        </h4>
                        <div className="prose prose-sm max-w-none text-[var(--primary-11)]">
                          {tab.content ? (
                            <ReactMarkdown>{tab.content}</ReactMarkdown>
                          ) : (
                            <p className="text-[var(--primary-10)] italic">
                              No content added
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-[var(--primary-10)]">
                    No content tabs configured
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Moderators */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="bg-[var(--primary-3)] border-[var(--primary-6)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--primary-12)]">
                  <User className="h-5 w-5" />
                  Moderators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formData.moderatorEmails &&
                  formData.moderatorEmails.length > 0 ? (
                    formData.moderatorEmails.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-[var(--primary-4)] rounded-lg border border-[var(--primary-6)]"
                      >
                        <User className="h-4 w-4 text-[var(--primary-10)]" />
                        <span className="text-[var(--primary-11)]">
                          {email}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[var(--primary-10)]">
                      No moderators added
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex justify-between"
        >
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="border-[var(--primary-7)] text-[var(--primary-11)] hover:bg-[var(--primary-4)]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous Step
          </Button>

          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-400 to-green-400 text-[var(--primary-1)] cursor-pointer"
          >
            Create Hackathon
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
