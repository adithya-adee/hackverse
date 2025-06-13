"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { Sex, UserType, HackathonStatus } from "@/types/core_enum";
import { User } from "@/types/core_interfaces";
import {
  UserDetailsFormValues,
  userDetailsSchema,
} from "@/schemas/user-schema";
import {
  useGetUserDetailsQuery,
  useUpdateUserProfileMutation,
} from "@/apiSlice/userApiSlice";
import {
  useGetHackathonDetailsQuery,
  useRegisterForHackathonMutation,
} from "@/apiSlice/hackathonApiSlice";
import { Loader } from "@/components/ui/loader";

function Page() {
  const router = useRouter();
  const params = useParams();
  const hackathonId = params["hackathon-id"] as string;

  // Fetch user and hackathon details
  const { data: user, isLoading: isLoadingUser } = useGetUserDetailsQuery();
  const { data: hackathon, isLoading: isLoadingHackathon } =
    useGetHackathonDetailsQuery(hackathonId);
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [registerForHackathon, { isLoading: isRegistering }] =
    useRegisterForHackathonMutation();

  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      biography: "",
      phoneNo: "",
      gender: "UNSPECIFIED",
      institutionName: "",
      type: "STUDENT",
      githubUrl: "",
      linkedinUrl: "",
      profileImageUrl: "",
      resumeUrl: "",
    },
  });

  // Update form when user data is loaded
  useEffect(() => {
    if (user) {
      const userFields: Array<keyof UserDetailsFormValues> = [
        "name",
        "email",
        "biography",
        "phoneNo",
        "gender",
        "institutionName",
        "type",
        "githubUrl",
        "linkedinUrl",
        "profileImageUrl",
        "resumeUrl",
      ];

      userFields.forEach((field) => {
        if (user[field]) {
          form.setValue(field, user[field] as string);
        }
      });
    }
  }, [user, form.setValue]);

  const onSubmit = async (data: UserDetailsFormValues) => {
    try {
      if (hackathon?.status !== HackathonStatus.UPCOMING) {
        toast.error("Registration is closed for this hackathon");
        return;
      }

      // Update user profile
      await updateProfile({
        ...data,
        gender: Sex[data.gender as keyof typeof Sex],
        type: UserType[data.type as keyof typeof UserType],
      }).unwrap();

      // Register for hackathon
      await registerForHackathon({
        hackathonId,
        userData: {
          userId: user?.id,
          ...data,
        },
      }).unwrap();

      toast.success("Registration successful!");

      // Redirect based on team size
      if (hackathon?.maxTeamSize > 1) {
        router.push(`/events/${hackathonId}/register/team`);
      } else {
        router.push(`/events/${hackathonId}`);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  // Gender options with proper typing
  const genderOptions = Object.keys(Sex).filter(
    (key) => !isNaN(Number(Sex[key as keyof typeof Sex])),
  ) as Array<keyof typeof Sex>;

  // User type options with proper typing
  const typeOptions = Object.keys(UserType).filter(
    (key) => !isNaN(Number(UserType[key as keyof typeof UserType])),
  ) as Array<keyof typeof UserType>;

  // Show loading state
  if (isLoadingUser || isLoadingHackathon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const formFields: Array<{
    name: keyof UserDetailsFormValues;
    label: string;
    type: string;
    placeholder: string;
  }> = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "phoneNo",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your phone number",
    },
    {
      name: "institutionName",
      label: "Institution Name",
      type: "text",
      placeholder: "Enter your institution",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-3)]">
      <div className="mt-16 mx-auto w-[80%] max-w-4xl ">
        <motion.div
          className="mt-5 p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
              UPDATE YOUR DETAILS
            </span>
          </motion.div>

          <motion.div
            className="shadow-sm rounded-2xl border-gray-300 overflow-hidden bg-[var(--primary-1)] border-solid border-[1px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 space-y-6">
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    className="space-y-2 "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-semibold text-[var(--primary-11)]"
                    >
                      {field.label}
                    </label>
                    <motion.input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      {...form.register(field.name)}
                      className="w-full px-4 py-3 transition-all shadow-sm rounded-2xl border-gray-300 duration-200 focus:outline-none "
                      style={{
                        backgroundColor: "var(--primary-2)",
                        border: "1px solid var(--primary-7)",
                        color: "var(--primary-12)",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                    {form.formState.errors[field.name] && (
                      <motion.p
                        className="text-sm text-red-500"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {form.formState.errors[field.name]?.message}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Gender Selection */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label className="block text-sm font-semibold text-[var(--primary-11)]">
                  Gender
                </label>
                <div className="flex gap-4">
                  {genderOptions.map((option) => (
                    <motion.label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={option}
                        {...form.register("gender")}
                        className="w-4 h-4"
                      />
                      <span className="text-sm capitalize">
                        {option.toLowerCase()}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              {/* Biography */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <label
                  htmlFor="biography"
                  className="block text-sm font-semibold text-[var(--primary-11)]"
                >
                  Biography
                </label>
                <motion.textarea
                  id="biography"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  {...form.register("biography")}
                  className="w-full px-4 py-3 transition-all duration-200 focus:outline-none  resize-none shadow-sm rounded-2xl border-gray-300"
                  style={{
                    backgroundColor: "var(--primary-2)",
                    border: "1px solid var(--primary-7)",
                    color: "var(--primary-12)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                />
                {form.formState.errors.biography && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {form.formState.errors.biography?.message}
                  </motion.p>
                )}
              </motion.div>

              {/*User Type */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold"
                  style={{ color: "var(--primary-11)" }}
                >
                  Who Are You?
                </label>
                <motion.select
                  {...form.register("type")}
                  className="w-full px-4 py-3"
                >
                  {typeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </motion.select>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <motion.button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isUpdating || isRegistering}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white w-full py-4 px-6 font-semibold text-lg transition-all duration-300 transform hover:shadow-sm rounded-2xl border-gray-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{
                    scale: !isUpdating && !isRegistering ? 1.02 : 1,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isUpdating || isRegistering ? (
                    <div className="flex items-center justify-center">
                      <Loader className="w-5 h-5 mr-2" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "REGISTER"
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info Card */}
          <motion.div
            className="mt-6 p-4 rounded-lg"
            style={{
              backgroundColor: "var(--primary-2)",
              border: "1px solid var(--primary-6)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <p className="text-sm text-center text-[var(--primary-11)]">
              Make sure all your details are correct before proceeding to team
              registration.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Page;
