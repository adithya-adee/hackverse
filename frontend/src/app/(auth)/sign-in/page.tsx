"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/apiSlice/authApiSlice";
import { setUserCredentials } from "@/apiSlice/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const onSubmit = async (data: LoginFormValues) => {
    console.log("Form submitted", data);
    const result = await login({
      user: data,
    });

    console.log(result);
    if ("data" in result) {
      dispatch(setUserCredentials(result.data));
      router.push("/");
    } else {
      // Handle error case here
      console.error("Login failed:", result.error);
    }
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
            Welcome to{" "}
            <span className="text-[var(--primary-10)]">HackVerse</span>
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[var(--primary-9)] hover:bg-[var(--primary-8)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-9)] focus:ring-offset-2 focus:ring-offset-[var(--primary-2)]"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}

function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[var(--primary-5)] via-[var(--primary-3)] to-[var(--primary-1)]">
      <LoginForm />
    </div>
  );
}

export default Page;
