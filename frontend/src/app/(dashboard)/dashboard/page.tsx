"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2 } from "lucide-react";
import type { Role, User as UserType } from "@/types/core_interfaces";
import { UserDetailsFormValues } from "@/schemas/user-schema";

import { ProfileInformationSection } from "@/components/dashboard/profile/ProfileInformationSection";
import { StatsSection } from "@/components/dashboard/profile/StatsSection";
import { SkillsSection } from "@/components/dashboard/profile/SkillSection";
import { PendingRequestsSection } from "@/components/dashboard/profile/PendingRequestSection";
import { RolesSection } from "@/components/dashboard/profile/RolesSection";
import {
  useGetTeamRequestsQuery,
  useGetUserDetailsQuery,
} from "@/apiSlice/userApiSlice";

const statsInitial = {
  totalHackathonsParticipated: 3,
  totalSubmissions: 2,
  totalTeamsCreated: 2,
  totalTeamsJoined: 3,
  averageRating: 4.25,
  completedHackathons: 2,
  activeHackathons: 1,
  wonHackathons: 1,
  totalEarnings: 15000,
};

const UserDetailsUpdatePage = () => {
  const [stats] = useState(statsInitial);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery();
  const { data: pendingTeamRequests } = useGetTeamRequestsQuery();
  // const [updateProfile, { isLoading: isUpdating }] =
  //   useUpdateUserDetailsMutation();

  const handleProfileSave = async (data: UserDetailsFormValues) => {
    try {
      // await updateProfile({
      //   ...data,
      //   // Only include fields that are actually defined in the form
      //   // This prevents sending undefined values to the API
      // }).unwrap();

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      // You could add a toast notification here
    }
  };

  const handleCancel = () => setIsEditing(false);
  const startEditing = () => setIsEditing(true);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-9)]" />
          <p className="text-lg font-medium text-[var(--primary-11)]">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
          <h2 className="text-red-800 text-xl font-semibold mb-4">
            Couldn't load your profile
          </h2>
          <p className="text-red-600 mb-6">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // No user state
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 max-w-md text-center">
          <h2 className="text-amber-800 text-xl font-semibold mb-4">
            No profile found
          </h2>
          <p className="text-amber-700 mb-6">
            We couldn't find your profile information. You may need to log in
            again.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => refetch()}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Refresh
            </Button>
            <Button
              onClick={() => (window.location.href = "/sign-in")}
              variant="outline"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const skills = user.Skill || [];
  const roles: Role[] =
    user.UserRole?.map((user_role) => user_role.Role).filter(
      (role): role is Role => role !== undefined
    ) || [];

  return (
    <div className="h-screen bg-background-1 text-foreground p-4">
      <div className="max-w-6xl mx-auto space-y-6">
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
                // disabled={isUpdating}
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
            <PendingRequestsSection
              count={
                Array.isArray(pendingTeamRequests)
                  ? pendingTeamRequests.length
                  : 0
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function DashboardPage() {
  return (
    <div className="w-full min-h-[200vh] h-auto bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] flex flex-col items-center justify-start p-6 mt-10">
      <UserDetailsUpdatePage />
    </div>
  );
}

export default DashboardPage;
