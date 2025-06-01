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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import userData from "@/assets/data/users_json_data.json";
import { UserDetailsFormValues } from "@/schemas/user-schema";
import { userDetailsSchema } from "@/schemas/user-schema";
import { ProfileInformationSection } from "@/components/dashboard/profile/ProfileInformationSection";
import { StatsSection } from "@/components/dashboard/profile/StatsSection";
import { formatDate } from "@/lib/formatters";

import { SkillsSection } from "@/components/dashboard/profile/SkillSection";
import { PendingRequestsSection } from "@/components/dashboard/profile/PendingRequestSection";

const RolesSection = ({ roles }: { roles: Role[] }) => (
  <Card className="shadow-lg border-border bg-card text-card-foreground">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="w-5 h-5 text-[var(--primary-9)]" />
        Roles
      </CardTitle>
      <CardDescription>Your platform roles and permissions</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      {roles.map((roleData) => (
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
);

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
  const startEditing = () => setIsEditing(true);

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
                onClick={startEditing}
                className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-5)] transition duration-200 ease-in"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information and Details */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileInformationSection
              user={user}
              isEditing={isEditing}
              handleProfileSave={handleProfileSave}
              handleCancel={handleCancel}
            />
            <SkillsSection skills={skills} />
            <RolesSection roles={roles} />
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <StatsSection stats={stats} />
            {stats.pendingTeamRequests > 0 && (
              <PendingRequestsSection count={stats.pendingTeamRequests} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsUpdatePage;
