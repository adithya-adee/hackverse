"use client";
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Upload, ChevronRight } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { hackathonStep1Schema, HackathonStep1Data } from "@/schemas/hackathon";
import { useHackathonForm } from "@/contexts/hackathon-form-context";

export default function CreateHackathonStep1() {
  const router = useRouter();
  const { formData, updateFormData } = useHackathonForm();

  const form = useForm<HackathonStep1Data>({
    resolver: zodResolver(hackathonStep1Schema),
    defaultValues: {
      title: formData.title || "",
      description: formData.description || "",
      location: formData.location || "",
      mode: formData.mode || "ONLINE",
      maxTeamSize: formData.maxTeamSize || 4,
      registrationDate: formData.registrationDate || "",
      startDate: formData.startDate || "",
      endDate: formData.endDate || "",
      bannerImageUrl: formData.bannerImageUrl || "",
    },
  });

  const watchMode = form.watch("mode");

  const onSubmit = async (data: HackathonStep1Data) => {
    if (data.registrationDate)
      data.registrationDate = new Date(data.registrationDate).toISOString();
    if (data.startDate) data.startDate = new Date(data.startDate).toISOString();
    if (data.endDate) data.endDate = new Date(data.endDate).toISOString();

    await updateFormData(data);

    router.push("/host-hackathon/step2");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-1)]">
      <div className="w-full md:w-[800px] py-5 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
              Basic Details
            </h1>
            <p className="text-var(--primary-11)">
              Let's start with the fundamental information about your hackathon
            </p>
          </div>

          <Card className="bg-[var(--primary-2)] border-var(--primary-6)">
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--primary-12)]">
                              Hackathon Title{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter hackathon title"
                                className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)] placeholder:text-[var(--primary-10)]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--primary-12)]">
                              Description{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your hackathon..."
                                rows={4}
                                className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)] placeholder:text-[var(--primary-10)]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Mode */}
                    <div>
                      <FormField
                        control={form.control}
                        name="mode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--primary-12)]">
                              Mode <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)]">
                                  <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[var(--primary-2)] border-[var(--primary-7)]">
                                <SelectItem
                                  value="ONLINE"
                                  className="text-[var(--primary-12)]"
                                >
                                  Online
                                </SelectItem>
                                <SelectItem
                                  value="OFFLINE"
                                  className="text-[var(--primary-12)]"
                                >
                                  Offline
                                </SelectItem>
                                <SelectItem
                                  value="HYBRID"
                                  className="text-[var(--primary-12)]"
                                >
                                  Hybrid
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Max Team Size */}
                    <div>
                      <FormField
                        control={form.control}
                        name="maxTeamSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--primary-12)]">
                              Max Team Size{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="10"
                                className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)]"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Location (conditional) */}
                    {(watchMode === "OFFLINE" || watchMode === "HYBRID") && (
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[var(--primary-12)]">
                                Location <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter venue address"
                                  className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)] placeholder:text-[var(--primary-10)]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Registration Date */}
                    <div>
                      <FormField
                        control={form.control}
                        name="registrationDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--primary-12)]">
                              Registration Deadline{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="datetime-local"
                                className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Start Date */}
                    <div>
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--primary-12)]">
                              Start Date <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="datetime-local"
                                className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* End Date */}
                    <div>
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--primary-12)]">
                              End Date <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="datetime-local"
                                className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Banner Image URL */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="bannerImageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[var(--primary-12)]">
                              Banner Image URL
                            </FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input
                                  type="url"
                                  placeholder="https://example.com/banner.jpg"
                                  className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)] placeholder:text-var(--primary-10)"
                                  {...field}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="border-[var(--primary-7)] text-[var(--primary-11)] hover:bg-[var(--primary-3)]"
                              >
                                <Upload className="w-4 h-4" />
                              </Button>
                            </div>
                            <FormMessage />
                            {field.value && (
                              <div className="mt-2">
                                <img
                                  src={field.value}
                                  alt="Banner preview"
                                  className="w-full h-32 object-cover rounded-lg border border-[var(--primary-6)]"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>
                            )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-green-600 text-[var(--primary-1)] flex items-center gap-2"
                    >
                      Next: Tags & Content
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
