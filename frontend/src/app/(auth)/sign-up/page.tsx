"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import GoogleIcon from "@/assets/google-icon.svg";
import { useSignupMutation } from "@/apiSlice/authApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "@/apiSlice/authSlice";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignUpComponent = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [signin, { isLoading }] = useSignupMutation();

  const onSubmit = async (data: SignupFormValues) => {
    const result = await signin({
      user: data,
    }).unwrap();

    if (result) {
      dispatch(setUserCredentials(result.data));
      router.push("/");
    } else {
      console.error("Signup failed:", result.error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Continue with Google clicked");
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0.2, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 1.5 }}
    >
      {/* Card */}
      <div className="backdrop-blur-sm border rounded-2xl p-8 shadow-2xl bg-[rgba(var(--primary-2),0.8)] border-[var(--primary-6)]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[var(--primary-12)]">
            Join <span className="text-[var(--primary-10)]">HackVerse</span>
          </h1>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[var(--primary-11)]">
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="w-full px-4 py-3 bg-[rgba(var(--primary-3),0.5)] border border-[var(--primary-6)] rounded-lg text-[var(--primary-12)] placeholder:text-[var(--primary-10)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-9)] focus:border-transparent transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[var(--primary-11)]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="w-full px-4 py-3 bg-[rgba(var(--primary-3),0.5)] border border-[var(--primary-6)] rounded-lg text-[var(--primary-12)] placeholder:text-[var(--primary-10)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-9)] focus:border-transparent transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[var(--primary-11)]">
                    Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="w-full pr-12 px-4 py-3 bg-[rgba(var(--primary-3),0.5)] border border-[var(--primary-6)] rounded-lg text-[var(--primary-12)] placeholder:text-[var(--primary-10)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-9)] focus:border-transparent transition-all"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--primary-11)] hover:text-[var(--primary-12)]"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </button>
                  </div>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            {/* Create Account Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[var(--primary-9)] hover:bg-[var(--primary-8)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-9)] focus:ring-offset-2 focus:ring-offset-[var(--primary-2)]"
            >
              Create account
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-[var(--primary-6)]"></div>
          <span className="px-4 text-sm text-[var(--primary-10)]">OR</span>
          <div className="flex-1 border-t border-[var(--primary-6)]"></div>
        </div>

        {/* Google Button */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full bg-transparent border border-[var(--primary-6)] hover:bg-[var(--primary-3)] text-[var(--primary-12)] font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-8)] focus:ring-offset-2 focus:ring-offset-[var(--primary-2)] flex items-center justify-center gap-3"
        >
          <GoogleIcon />
          Continue with Google
        </Button>
      </div>
    </motion.div>
  );
};

function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-4)] to-[var(--primary-2)] flex items-center justify-center p-6">
      <SignUpComponent />
    </div>
  );
}

export default SignUpPage;
