"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  User,
  Mail,
  Github,
  Linkedin,
  FileText,
  Trophy,
  Users,
  Target,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  UserPlus,
  Edit3,
  Save,
  X,
  PlusIcon,
} from "lucide-react";
import type { Role, User as UserType } from "@/types/core_interfaces";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import userData from "@/assets/data/users_json_data.json";

const user1 = userData[0];

const statsInitial = {
  totalHackathonsParticipated: 3,
  totalSubmissions: 2,
  totalTeamsCreated: 2,
  totalTeamsJoined: 3,
  averageRating: 4.25,
  completedHackathons: 2,
  activeHackathons: 1,
  pendingTeamRequests: 3,
  wonHackathons: 1,
  totalEarnings: 15000,
};

const userDetailsSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  biography: z.string().max(500, "Biography too long"),
  githubUrl: z.string().url("Invalid GitHub URL"),
  linkedinUrl: z.string().url("Invalid LinkedIn URL"),
  profileImageUrl: z.string().url("Invalid image URL"),
  resumeUrl: z.string().url("Invalid resume URL"),
});

type UserDetailsFormValues = z.infer<typeof userDetailsSchema>;

function ProfileForm({
  initialData,
  isEditing,
  onSubmit,
  onCancel,
}: {
  initialData: UserType;
  isEditing: boolean;
  onSubmit: (data: UserDetailsFormValues) => void;
  onCancel: () => void;
}) {
  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      biography: initialData.biography,
      githubUrl: initialData.githubUrl,
      linkedinUrl: initialData.linkedinUrl,
      profileImageUrl: initialData.profileImageUrl,
      resumeUrl: initialData.resumeUrl,
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    form.reset({
      name: initialData.name,
      email: initialData.email,
      biography: initialData.biography,
      githubUrl: initialData.githubUrl,
      linkedinUrl: initialData.linkedinUrl,
      profileImageUrl: initialData.profileImageUrl,
      resumeUrl: initialData.resumeUrl,
    });
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isEditing}
                    className="transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
                    <Input
                      {...field}
                      type="email"
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={!isEditing}
                  rows={3}
                  className="transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Github className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Linkedin className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="profileImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isEditing}
                    className="transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resumeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume URL</FormLabel>
                <FormControl>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
                    <Input
                      {...field}
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isEditing && (
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-5)] transition duration-200 ease-out"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="hover:bg-[var(--primary-11)] transition duration-200 ease-out"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

const UserDetailsUpdatePage = () => {
  const [user, setUser] = useState<UserType>(user1 as UserType);
  const [stats] = useState(statsInitial);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileSave = (data: UserDetailsFormValues) => {
    setUser({
      ...user,
      ...data,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const skills = user.Skill || [];
  const roles: Role[] =
    user.UserRole?.map((user_role) => user_role.Role).filter(
      (role): role is Role => role !== undefined
    ) || [];

  return (
    <div className="h-screen bg-background-1 text-foreground p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[var(--primary-12)] text-2xl">User Profile</p>
            <p className="text-[var(--muted-foreground)] mt-1">
              Manage your profile information and settings
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-5)] transition duration-200 ease-in"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information (shadcn Form) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-border bg-card text-card-foreground">
              <CardHeader className="text-[var(--primary-12)] rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-[var(--primary-12)]/80">
                  Update your personal information and links
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <ProfileForm
                  initialData={user}
                  isEditing={isEditing}
                  onSubmit={handleProfileSave}
                  onCancel={handleCancel}
                />
                {!isEditing && (
                  <div className="pt-4 text-sm text-[var(--muted-foreground)]">
                    <p>Created: {formatDate(user.createdAt)}</p>
                    <p>Last Updated: {formatDate(user.updatedAt)}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="shadow-lg border-border bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[var(--primary-9)]" />
                  Skills
                </CardTitle>
                <CardDescription>
                  Your technical skills and expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="px-3 py-1 bg-[var(--secondary)] text-[var(--secondary-foreground)]"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                  <Badge
                    variant="outline"
                    className="hover:bg-gray-300 transition duration-200 ease-in"
                  >
                    <PlusIcon />
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Roles Section */}
            <Card className="shadow-lg border-border bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--primary-9)]" />
                  Roles
                </CardTitle>
                <CardDescription>
                  Your platform roles and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.map((roleData, index) => (
                  <div
                    key={roleData?.id}
                    className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]"
                  >
                    <div>
                      <Badge className="mb-1 bg-[var(--accent)] text-[var(--accent-foreground)]">
                        {roleData?.name}
                      </Badge>
                      <p className="text-sm">{roleData.description}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p>Assigned</p>
                      <p>{formatDate(roleData.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-border bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[var(--primary-9)]">
                  <Trophy className="w-5 h-5" />
                  Statistics
                </CardTitle>
                <CardDescription>Your hackathon journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="w-4 h-4 text-[var(--primary-9)] mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-[var(--foreground)]">
                      {stats.totalHackathonsParticipated}
                    </div>
                    <div className="text-xs">Participated</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
                    <div className="flex items-center justify-center mb-1">
                      <FileText className="w-4 h-4 text-[var(--primary-9)] mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-[var(--foreground)]">
                      {stats.totalSubmissions}
                    </div>
                    <div className="text-xs">Submissions</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-[var(--primary-9)] mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-[var(--foreground)]">
                      {stats.totalTeamsCreated}
                    </div>
                    <div className="text-xs">Teams Created</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]">
                    <div className="flex items-center justify-center mb-1">
                      <UserPlus className="w-4 h-4 text-[var(--primary-9)] mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-[var(--foreground)]">
                      {stats.totalTeamsJoined}
                    </div>
                    <div className="text-xs">Teams Joined</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[var(--chart-4)]" />
                      <span className="text-sm">Average Rating</span>
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">
                      {stats.averageRating}/5
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--chart-2)]" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">
                      {stats.completedHackathons}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--primary-9)]" />
                      <span className="text-sm">Active</span>
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">
                      {stats.activeHackathons}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[var(--chart-1)]" />
                      <span className="text-sm">Won</span>
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">
                      {stats.wonHackathons}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-[var(--muted)]/50 rounded text-[var(--muted-foreground)]">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[var(--chart-2)]" />
                      <span className="text-sm">Total Earnings</span>
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">
                      ${stats.totalEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Requests */}
            {stats.pendingTeamRequests > 0 && (
              <Card className="shadow-lg border-border bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[var(--chart-1)]">
                    <Clock className="w-5 h-5" />
                    Pending Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--foreground)] mb-1">
                      {stats.pendingTeamRequests}
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">
                      Team invitations waiting
                    </div>
                    <Button
                      size="sm"
                      className="mt-3 bg-[var(--primary-9)] text-white hover:bg-[var(--primary-9)]/90"
                    >
                      View Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsUpdatePage;
