"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Tag, Eye, Check } from "lucide-react";
import { usePathname } from "next/navigation";

const steps = [
  {
    number: 1,
    title: "Basic Details",
    icon: FileText,
    path: "/host-hackathon/step1",
  },
  {
    number: 2,
    title: "More Details",
    icon: Tag,
    path: "/host-hackathon/step2",
  },
  {
    number: 3,
    title: "Review",
    icon: Eye,
    path: "/host-hackathon/step3",
  },
];

export function HackathonProgress() {
  const pathname = usePathname();

  const getCurrentStep = () => {
    const currentStep = steps.find((step) => pathname === step.path);
    return currentStep?.number || 1;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--primary-11)]">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-[var(--primary-10)]">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-[var(--primary-4)] rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-2 bg-gradient-to-r from-[var(--primary-9)] to-[var(--primary-10)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-lg font-semibold text-[var(--primary-12)]">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-[var(--primary-4)] -z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--primary-9)] to-[var(--primary-10)]"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            const isUpcoming = step.number > currentStep;

            return (
              <motion.div
                key={step.number}
                className="flex flex-col items-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Step Circle */}
                <motion.div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-[var(--primary-9)] border-[var(--primary-9)] text-[var(--primary-1)]"
                        : isCurrent
                          ? "bg-[var(--primary-3)] border-[var(--primary-9)] text-[var(--primary-12)]"
                          : "bg-[var(--primary-2)] border-[var(--primary-6)] text-[var(--primary-10)]"
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 500,
                      }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </motion.div>

                {/* Step Info */}
                <div className="mt-3 text-center">
                  <motion.div
                    className={`
                      text-xs font-medium mb-1 transition-colors duration-300
                      ${isCurrent ? "text-[var(--primary-9)]" : "text-[var(--primary-10)]"}
                    `}
                    animate={{ scale: isCurrent ? 1.05 : 1 }}
                  >
                    Step {step.number}
                  </motion.div>
                  <motion.div
                    className={`
                      text-sm font-semibold transition-colors duration-300
                      ${isCurrent ? "text-[var(--primary-12)]" : "text-[var(--primary-11)]"}
                    `}
                    animate={{ scale: isCurrent ? 1.05 : 1 }}
                  >
                    {step.title}
                  </motion.div>
                </div>

                {/* Current Step Indicator */}
                {isCurrent && (
                  <motion.div
                    className="absolute -bottom-2 w-2 h-2 bg-[var(--primary-9)] rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
