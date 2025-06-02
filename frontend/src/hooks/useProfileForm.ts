import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDetailsSchema } from "@/schemas/user-schema";
import type { UserDetailsFormValues } from "@/schemas/user-schema";
import type { User as UserType } from "@/types/core_interfaces";

export function useProfileForm(
  initialData: UserType,
  onSave: (data: UserDetailsFormValues) => void
) {
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
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

  const handleSave = (data: UserDetailsFormValues) => {
    onSave(data);
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);
  const startEditing = () => setIsEditing(true);

  return {
    form,
    isEditing,
    startEditing,
    handleSave,
    handleCancel,
  };
}
