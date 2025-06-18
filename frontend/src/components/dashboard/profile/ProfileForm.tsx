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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Github,
  Linkedin,
  FileText,
  Save,
  X,
  Building2,
  Phone,
  UserRound,
  Briefcase,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { UserDetailsFormValues } from "@/schemas/user-schema";

interface ProfileFormProps {
  form: UseFormReturn<UserDetailsFormValues>;
  isEditing: boolean;
  isSubmitting?: boolean;
  onSubmit: (data: UserDetailsFormValues) => void;
  onCancel: () => void;
}

export function ProfileForm({
  form,
  isEditing,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: ProfileFormProps) {
  // Create a better handler for form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    // Get current values for debugging
    const values = form.getValues();
    console.log("Current form values:", values);

    // Use the handleSubmit function properly
    form.handleSubmit(
      (data) => {
        console.log("Form validation passed:", data);
        onSubmit(data);
      },
      (errors) => {
        console.error("Form validation failed:", errors);
      }
    )(e);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleFormSubmit}
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
                      value={field.value || ""}
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
                      value={field.value || ""}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
                    <Input
                      {...field}
                      value={field.value || ""}
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                      placeholder="e.g., +1234567890"
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  Include country code for international format
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Institution Name Field */}
          <FormField
            control={form.control}
            name="institutionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
                    <Input
                      {...field}
                      value={field.value || ""}
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                      placeholder="University or Company"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gender Selection */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  disabled={!isEditing}
                  onValueChange={field.onChange}
                  defaultValue={field.value || "UNSPECIFIED"}
                  value={field.value || "UNSPECIFIED"}
                >
                  <FormControl>
                    <SelectTrigger className="w-full transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]">
                      <div className="flex items-center">
                        <UserRound className="w-4 h-4 mr-2 text-[var(--muted-foreground)]" />
                        <SelectValue placeholder="Select gender" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="UNSPECIFIED">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* User Type Selection */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <Select
                  disabled={!isEditing}
                  onValueChange={field.onChange}
                  defaultValue={field.value || "STUDENT"}
                  value={field.value || "STUDENT"}
                >
                  <FormControl>
                    <SelectTrigger className="w-full transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-[var(--muted-foreground)]" />
                        <SelectValue placeholder="Select type" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                    <SelectItem value="OTHERS">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                  value={field.value || ""}
                  disabled={!isEditing}
                  rows={3}
                  className="transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                  placeholder="Tell us about yourself"
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
                      value={field.value || ""}
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                      placeholder="https://github.com/username"
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
                      value={field.value || ""}
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                      placeholder="https://linkedin.com/in/username"
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
                    value={field.value || ""}
                    disabled={!isEditing}
                    className="transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                    placeholder="https://example.com/profile.jpg"
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
                      value={field.value || ""}
                      disabled={!isEditing}
                      className="pl-10 transition-all duration-200 bg-[var(--background)] text-[var(--foreground)]"
                      placeholder="https://example.com/resume.pdf"
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
              disabled={isSubmitting || !form.formState.isDirty}
              className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-5)] transition duration-200 ease-out"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
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
