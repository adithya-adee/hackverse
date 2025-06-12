"use client";
import React from "react";
import UserData from "@/assets/data/users_json_data.json";
import { userDetailsSchema } from "@/schemas/user-schema";
import { UserDetailsFormValues } from "@/schemas/user-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

function Page() {
  //TODO:
  //fetch the user using userid present in global state
  //demo user for now
  const user = UserData[0];

  const params = useParams();
  const hackathonId = params["hackathon-id"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetailsFormValues>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      biography: user.biography || "",
      phoneNo: user.phoneNo || "",
      gender: user.gender,
      institutionName: user.institutionName || "",
      type: user.type,
      githubUrl: user.githubUrl || "",
      linkedinUrl: user.linkedinUrl || "",
      profileImageUrl: user.profileImageUrl || "",
      resumeUrl: user.resumeUrl || "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: UserDetailsFormValues) => {
    //TODO: update the user details and register him in hackathon with hackathonId
    console.log("Form data:", data);

    //TODO: if the hackathon is individual competition then redirect user to events page again, and if not then-->
    window.location.href = `/events/${hackathonId}/register/team`;
  };

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
                      {...register(field.name)}
                      className="w-full px-4 py-3 transition-all shadow-sm rounded-2xl border-gray-300 duration-200 focus:outline-none "
                      style={{
                        backgroundColor: "var(--primary-2)",
                        border: "1px solid var(--primary-7)",
                        color: "var(--primary-12)",
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors[field.name] && (
                      <motion.p
                        className="text-sm text-red-500"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {errors[field.name]?.message}
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
                  {["MALE", "FEMALE", "UNSPECIFIED"].map((option, index) => (
                    <motion.label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    >
                      <input
                        type="radio"
                        value={option}
                        {...register("gender")}
                        className="w-4 h-4 rounded-full border-2 focus:outline-none  transition-all custom-radio"
                        style={{
                          borderColor: "var(--primary-7)",
                          accentColor: "var(--primary-9)",
                        }}
                      />
                      <span className="text-sm capitalize text-[var(--primary-11)]">
                        {option}
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
                  {...register("biography")}
                  className="w-full px-4 py-3 transition-all duration-200 focus:outline-none  resize-none shadow-sm rounded-2xl border-gray-300"
                  style={{
                    backgroundColor: "var(--primary-2)",
                    border: "1px solid var(--primary-7)",
                    color: "var(--primary-12)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.biography && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.biography?.message}
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
                  id="type"
                  {...register("type")}
                  className="bg-[var(--primary-2)] border-solid border-[1px] border-[var(--primary-7)] text-[var(--primary-12)] w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none "
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="PROFESSIONAL">PROFESSIONAL</option>
                  <option value="OTHERS">OTHERS</option>
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
                  onClick={handleSubmit(onSubmit)}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white w-full py-4 px-6 font-semibold text-lg transition-all duration-300 transform hover:shadow-sm rounded-2xl border-gray-300 focus:outline-none focus:ring-4"
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  REGISTER
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
