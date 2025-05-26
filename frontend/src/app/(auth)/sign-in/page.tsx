"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useLoginMutation } from "@/apiSlice/authApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "@/apiSlice/authSlice";

// Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// TypeScript type
type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
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
    dispatch(setUserCredentials(result));
  };

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="bg-primary-2/80 backdrop-blur-sm border border-primary-6 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-12 mb-2">
            Welcome to <span className="text-primary-10">HackVerse</span>
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <Button
              type="submit"
              className="w-full bg-primary-9 hover:bg-primary-8 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-9 focus:ring-offset-2 focus:ring-offset-primary-2"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-1 via-primary-4 to-primary-2 flex items-center justify-center p-6">
      <LoginForm />;
    </div>
  );
}

export default Page;
