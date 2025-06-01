"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Tag,
  FileText,
  Eye,
  Car,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hackathonStep2Schema, HackathonStep2Data } from "@/schemas/hackathon";
import { useHackathonForm } from "@/contexts/hackathon-form-context";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

export default function CreateHackathonStep2() {
  const router = useRouter();
  const { formData, updateFormData } = useHackathonForm();
  const [newTag, setNewTag] = useState("");
  const form = useForm<HackathonStep2Data>({
    resolver: zodResolver(hackathonStep2Schema),
    defaultValues: {
      tags: formData.tags || [],
      tabs: formData.tabs || [
        { title: "Overview", content: "", order: 1, isVisible: true },
        { title: "Rules", content: "", order: 2, isVisible: true },
        { title: "Prizes", content: "", order: 3, isVisible: true },
      ],
      moderatorEmails: formData.moderatorEmails || [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "tabs",
  });

  const watchTags = form.watch("tags");

  const addTag = () => {
    if (newTag.trim() && !watchTags.includes(newTag.trim())) {
      form.setValue("tags", [...watchTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = watchTags.filter((_, i) => i !== index);
    form.setValue("tags", newTags);
  };

  const addTab = () => {
    append({
      title: `Tab ${fields.length + 1}`,
      content: "",
      order: fields.length + 1,
      isVisible: true,
    });
  };

  const [newModeratorEmail, setNewModeratorEmail] = useState("");

  const watchModeratorEmails = form.watch("moderatorEmails") || [];

  const addModerator = () => {
    const email = newModeratorEmail.trim();
    if (email && !watchModeratorEmails.includes(email)) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        form.setValue("moderatorEmails", [...watchModeratorEmails, email]);
        setNewModeratorEmail("");
      }
    }
  };

  const removeModerator = (index: number) => {
    const newModerators = watchModeratorEmails.filter((_, i) => i !== index);
    form.setValue("moderatorEmails", newModerators);
  };

  const onSubmit = async (data: HackathonStep2Data) => {
    console.log("data:", data);
    console.log(formData);
    const rel = await updateFormData(data);
    console.log("result:", rel);
    console.log(formData);
    router.push("/host-hackathon/step3");
  };

  const goBack = () => {
    const currentData = form.getValues();
    updateFormData(currentData);
    router.push("/host-hackathon/step1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-1)] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
              Tags & Content
            </h1>
            <p className="text-[var(--primary-11)]">
              Add tags and create content tabs for your hackathon
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Tags Section */}
              <Card className="bg-[var(--primary-2)] border-[var(--primary-6)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--primary-12)]">
                    <Tag className="w-5 h-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Add a tag (e.g., AI, Web Development, Mobile)"
                      className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)] placeholder:text-[var(--primary-10)]"
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      className="bg-[var(--primary-9)] hover:bg-[var(--primary-10)] text-[var(--primary-1)]"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 p-2 items-centers-">
                    {watchTags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="px-3 py-2 text-xs font-bold rounded-full border"
                        style={{
                          backgroundColor: "var(--primary-3)",
                          color: "var(--primary-11)",
                          borderColor: "var(--primary-6)",
                        }}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="text-[var(--primary-11)] hover:text-[var(--primary-12)] p-1"
                        >
                          <Trash2 className="w-4 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Content Tabs Section */}
              <Card className="bg-[var(--primary-2)] border-[var(--primary-6)]">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-[var(--primary-12)]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Content Tabs
                    </div>
                    <Button
                      type="button"
                      onClick={addTab}
                      variant="outline"
                      size="sm"
                      className="border-[var(--primary-7)] [text-var(--primary-12)] hover:bg-[var(--primary-3)]"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Tab
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-[var(--primary-6)] rounded-lg bg-[var(--primary-1)]"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between mb-4 p-4 border rounded-xl bg-[var(--primary-1)]">
                          {/* Tab Title Input */}
                          <div className="flex-1 w-full">
                            <FormField
                              control={form.control}
                              name={`tabs.${index}.title`}
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormLabel className="text-[var(--primary-12)]">
                                    Tab Title
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Enter tab title"
                                      className="bg-[var(--primary-2)] border-[var(--primary-7)] text-[var(--primary-12)]"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Visibility + Delete */}
                          <div className="flex items-center gap-4">
                            {/* Checkbox */}
                            <FormField
                              control={form.control}
                              name={`tabs.${index}.isVisible`}
                              render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="border-[var(--primary-7)]"
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm text-[var(--primary-11)] flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    Visible
                                  </FormLabel>
                                </FormItem>
                              )}
                            />

                            {/* Delete Button */}
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => remove(index)}
                                variant="outline"
                                size="icon"
                                className="border-red-600 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name={`tabs.${index}.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="mx-4 text-[var(--primary-12)]">
                                Content
                              </FormLabel>
                              <FormControl>
                                <Tabs defaultValue="edit" className="w-full">
                                  <TabsList className="grid shadow-sm gap-2 w-full grid-cols-1 md:grid-cols-2 bg-[var(--primary-1)]">
                                    <TabsTrigger
                                      value="edit"
                                      className="bg-[var(--primary-2)] text-[var(--primary-11)] shadow-sm"
                                    >
                                      Edit
                                    </TabsTrigger>
                                    <TabsTrigger
                                      value="preview"
                                      className="bg-[var(--primary-2)] text-[var(--primary-11)]"
                                    >
                                      Preview
                                    </TabsTrigger>
                                  </TabsList>

                                  <TabsContent
                                    value="edit"
                                    className="mt-4 z-0"
                                  >
                                    <MdEditor
                                      value={field.value}
                                      style={{ height: "300px" }}
                                      renderHTML={(text) => (
                                        <ReactMarkdown>{text}</ReactMarkdown>
                                      )}
                                      onChange={({ text }) =>
                                        field.onChange(text)
                                      }
                                      placeholder="Write your content in Markdown..."
                                    />
                                  </TabsContent>

                                  <TabsContent value="preview" className="mt-4">
                                    <div className="min-h-[300px] p-4 border border-[var(--primary-6)] rounded-md bg-[var(--primary-1)]">
                                      <div className="prose prose-sm max-w-none text-[var(--primary-12)]">
                                        <ReactMarkdown>
                                          {field.value ||
                                            "*No content to preview*"}
                                        </ReactMarkdown>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/*TODO:Improvement in moderator logic - first fetch the email from the backend if it is valid then on the spot correct the user if its wrong also show the moderators details */}
              {/* Moderators Section */}
              <Card className="bg-[var(--primary-3)] border-[var(--primary-6)]">
                <CardHeader>
                  <CardTitle className="text-[var(--primary-12)]">
                    Moderators
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newModeratorEmail}
                      onChange={(e) => setNewModeratorEmail(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addModerator();
                        }
                      }}
                      placeholder="Enter moderator email"
                      className="bg-[var(--primary-1)] border-[var(--primary-7)] text-[var(--primary-12)] placeholder:text-[var(--primary-10)]"
                    />
                    <Button
                      type="button"
                      onClick={addModerator}
                      variant="outline"
                      className="border-[var(--primary-7)] text-[var(--primary-11)] hover:bg-[var(--primary-4)]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {watchModeratorEmails.map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-[var(--primary-4)] rounded-lg border border-[var(--primary-6)]"
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[var(--primary-10)]" />
                          <span className="text-[var(--primary-11)]">
                            {email}
                          </span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeModerator(index)}
                          variant="outline"
                          size="icon"
                          className="border-red-600 text-red-600 hover:bg-red-50 h-8 w-8"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {watchModeratorEmails.length === 0 && (
                      <p className="text-[var(--primary-10)] text-sm italic">
                        No moderators added yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  onClick={goBack}
                  variant="outline"
                  className="border-[var(--primary-7)] text-[var(--primary-12)] hover:bg-[var(--primary-3)]"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous Step
                </Button>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-400 to-green-400 text-[var(--primary-1)] cursor-pointer"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
