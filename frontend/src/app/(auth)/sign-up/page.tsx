"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSignupMutation } from "@/apiSlice/authApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "@/apiSlice/authSlice";

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

  const dispatch = useDispatch();

  const [signin, { isLoading }] = useSignupMutation();

  const onSubmit = async (data: SignupFormValues) => {
    console.log("Form submitted:", data);
    const result = await signin({
      user: data,
    }).unwrap();

    console.log(result);
    dispatch(setUserCredentials(result));
  };

  const handleGoogleLogin = () => {
    console.log("Continue with Google clicked");
  };

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-primary-2/80 backdrop-blur-sm border border-primary-6 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-12 mb-2">
            Join <span className="text-primary-10">HackVerse</span>
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
                  <FormLabel className="text-sm font-medium text-primary-11">
                    Full name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="w-full px-4 py-3 bg-primary-3/50 border border-primary-6 rounded-lg text-primary-12 placeholder-primary-10 focus:outline-none focus:ring-2 focus:ring-primary-9 focus:border-transparent transition-all"
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
                  <FormLabel className="text-sm font-medium text-primary-11">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="w-full px-4 py-3 bg-primary-3/50 border border-primary-6 rounded-lg text-primary-12 placeholder-primary-10 focus:outline-none focus:ring-2 focus:ring-primary-9 focus:border-transparent transition-all"
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
              render={({ field }) => {
                const [showPassword, setShowPassword] = useState(false);
                const togglePassword = () => setShowPassword((prev) => !prev);

                return (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-primary-11">
                      Password
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="w-full pr-12 px-4 py-3 bg-primary-3/50 border border-primary-6 rounded-lg text-primary-12 placeholder-primary-10 focus:outline-none focus:ring-2 focus:ring-primary-9 focus:border-transparent transition-all"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-11 hover:text-primary-12"
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
                );
              }}
            />

            {/* Create Account Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-primary-9 hover:bg-primary-8 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-9 focus:ring-offset-2 focus:ring-offset-primary-2"
            >
              Create account
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-primary-6"></div>
          <span className="px-4 text-sm text-primary-10">OR</span>
          <div className="flex-1 border-t border-primary-6"></div>
        </div>

        {/* Google Button */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full bg-transparent border border-primary-6 hover:bg-primary-3 text-primary-12 font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-8 focus:ring-offset-2 focus:ring-offset-primary-2 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-1 via-primary-4 to-primary-2 flex items-center justify-center p-6">
      <SignUpComponent />;
    </div>
  );
}

export default Page;
