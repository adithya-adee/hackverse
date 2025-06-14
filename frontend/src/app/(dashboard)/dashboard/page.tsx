"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit3, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { Role, User as UserType } from "@/types/core_interfaces";
import { UserDetailsFormValues } from "@/schemas/user-schema";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  buttonVariants,
} from "@/lib/animation";

import { ProfileInformationSection } from "@/components/dashboard/profile/ProfileInformationSection";
// import { StatsSection } from "@/components/dashboard/profile/StatsSection";
import { SkillsSection } from "@/components/dashboard/profile/SkillSection";
import { PendingRequestsSection } from "@/components/dashboard/profile/PendingRequestSection";
import { RolesSection } from "@/components/dashboard/profile/RolesSection";
import {
  useGetTeamRequestsQuery,
  useGetUserDetailsQuery,
  useUpdateUserProfileMutation,
} from "@/apiSlice/userApiSlice";

// const statsInitial = {
//   totalHackathonsParticipated: 3,
//   totalSubmissions: 2,
//   totalTeamsCreated: 2,
//   totalTeamsJoined: 3,
//   averageRating: 4.25,
//   completedHackathons: 2,
//   activeHackathons: 1,
//   wonHackathons: 1,
//   totalEarnings: 15000,
// };

const UserDetailsUpdatePage = () => {
  // const [stats] = useState(statsInitial);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery();
  const { data: pendingTeamRequests } = useGetTeamRequestsQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const handleProfileSave = async (data: UserDetailsFormValues) => {
    try {
      const apiData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          return [key, value === "" ? null : value];
        })
      );

      await updateProfile({ id: user?.id, ...apiData }).unwrap();

      toast.success("Profile updated successfully", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });

      setIsEditing(false);
    } catch (err) {
      const errorMessage =
        err && typeof err === "object" && "data" in err
          ? (err.data as any)?.message || "Failed to update profile"
          : "An error occurred while updating your profile";

      toast.error(errorMessage, {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    }
  };

  const handleCancel = () => setIsEditing(false);
  const startEditing = () => setIsEditing(true);

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        className="h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center space-y-4"
        >
          <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-9)]" />
          <p className="text-lg font-medium text-[var(--primary-11)]">
            Loading your profile...
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        className="h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="bg-[var(--primary-1)] border border-[var(--primary-5)] rounded-lg p-8 max-w-md text-center"
        >
          <h2 className="text-[var(--primary-11)] text-xl font-semibold mb-4">
            Couldn't load your profile
          </h2>
          <p className="text-[var(--primary-10)] mb-6">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </p>
          <motion.div variants={buttonVariants}>
            <Button
              onClick={() => refetch()}
              className="bg-[var(--primary-12)] hover:bg-[var(--primary-1)] text-[var(--primary-1)] hover:text-[var(--primary-12)] transition ease-in-out duration-150"
            >
              Try Again
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // No user state
  if (!user) {
    return (
      <motion.div
        className="h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="bg-[var(--primary-1)] border border-[var(--primary-5)] rounded-lg p-8 max-w-md text-center"
        >
          <h2 className="text-[var(--primary-11)] text-xl font-semibold mb-4">
            No profile found
          </h2>
          <p className="text-[var(--primary-10)] mb-6">
            We couldn't find your profile information. You may need to log in
            again.
          </p>
          <div className="flex justify-center gap-4">
            <motion.div variants={buttonVariants}>
              <Button
                onClick={() => refetch()}
                className="bg-[var(--primary-9)] hover:bg-[var(--primary-10)] text-white"
              >
                Refresh
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button
                onClick={() => (window.location.href = "/sign-in")}
                variant="outline"
                className="border-[var(--primary-7)] text-[var(--primary-11)]"
              >
                Sign In
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const skills = user.Skill || [];
  const roles: Role[] =
    user.UserRole?.map((user_role) => user_role.Role).filter(
      (role): role is Role => role !== undefined
    ) || [];

  return (
    <motion.div
      className="h-screen bg-background-1 text-foreground p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          className="flex items-center justify-between"
          variants={itemVariants}
        >
          <div>
            <p className="text-[var(--primary-12)] text-2xl">User Profile</p>
            <p className="text-[var(--muted-foreground)] mt-1">
              Manage your profile information and settings
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <Button
                  onClick={startEditing}
                  disabled={isUpdating}
                  className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-5)] transition duration-200 ease-in"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>
            ) : null}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {/* Profile Information and Details */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={itemVariants}
          >
            <ProfileInformationSection
              user={user}
              isEditing={isEditing}
              isSubmitting={isUpdating}
              handleProfileSave={handleProfileSave}
              handleCancel={handleCancel}
            />
          </motion.div>

          {/* Stats Sidebar */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* <StatsSection stats={stats} /> */}
            <SkillsSection userId={user.id} skills={skills} />
            <RolesSection roles={roles} />
            <PendingRequestsSection
              count={
                Array.isArray(pendingTeamRequests)
                  ? pendingTeamRequests.length
                  : 0
              }
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

function DashboardPage() {
  return (
    <motion.div
      className="w-full min-h-[200vh] h-auto bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] flex flex-col items-center justify-start p-6 mt-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <UserDetailsUpdatePage />
    </motion.div>
  );
}

export default DashboardPage;
