import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Mail, Github, Linkedin, FileText, Save, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { UserDetailsFormValues } from "@/schemas/user-schema";

interface ProfileFormProps {
  form: UseFormReturn<UserDetailsFormValues>;
  isEditing: boolean;
  onSubmit: (data: UserDetailsFormValues) => void;
  onCancel: () => void;
}

export function ProfileForm({
  form,
  isEditing,
  onSubmit,
  onCancel,
}: ProfileFormProps) {
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
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
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
          defaultValue=""
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
