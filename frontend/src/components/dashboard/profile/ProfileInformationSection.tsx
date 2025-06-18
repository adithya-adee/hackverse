"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { userDetailsSchema } from "@/schemas/user-schema";
import { UserDetailsFormValues } from "@/schemas/user-schema";
import type { User as UserType } from "@/types/core_interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { ProfileForm } from "./ProfileForm";
import { formatDate } from "@/lib/formatters";

export const ProfileInformationSection = ({
  user,
  isEditing,
  isSubmitting = false,
  handleProfileSave,
  handleCancel,
}: {
  user: UserType;
  isEditing: boolean;
  isSubmitting?: boolean; // Make it optional
  handleProfileSave: (data: UserDetailsFormValues) => void;
  handleCancel: () => void;
}) => {
  // In ProfileInformationSection.tsx
  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    biography: user?.biography ?? "",
    phoneNo: user?.phoneNo ?? "",
    gender: user?.gender ?? "UNSPECIFIED",
    institutionName: user?.institutionName ?? "",
    type: user?.type ?? "STUDENT",
    githubUrl: user?.githubUrl ?? "",
    linkedinUrl: user?.linkedinUrl ?? "",
    profileImageUrl: user?.profileImageUrl ?? "",
    resumeUrl: user?.resumeUrl ?? "",
  };

  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(userDetailsSchema) as any,
    defaultValues,
    mode: "onChange",
  });

  // Reset form when user data changes - also handle nulls properly
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        biography: user.biography || "",
        phoneNo: user.phoneNo || "",
        gender: user.gender || "UNSPECIFIED",
        institutionName: user.institutionName || "",
        type: user.type || "OTHERS",
        githubUrl: user.githubUrl || "",
        linkedinUrl: user.linkedinUrl || "",
        profileImageUrl: user.profileImageUrl || "",
        resumeUrl: user.resumeUrl || "",
      });
    }
  }, [user, form]);

  return (
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
          form={form}
          isEditing={isEditing}
          isSubmitting={isSubmitting} // Pass isSubmitting to ProfileForm
          onSubmit={handleProfileSave}
          onCancel={handleCancel}
        />
        {!isEditing && user && (
          <div className="pt-4 text-sm text-[var(--muted-foreground)]">
            <p>Created: {formatDate(user.createdAt)}</p>
            <p>Last Updated: {formatDate(user.updatedAt)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
