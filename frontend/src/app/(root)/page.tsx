"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users, Trophy, Calendar } from "lucide-react";

function Page() {
  return (
    <div className="scrollbar-hide overflow-hidden">
      {/* Hero Section */}

      <section className="relative overflow-auto scrollbar-hide">
        {/* Background Gradient with Pattern */}
        <div className=" absolute inset-0 bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-2)] to-[var(--primary-3)] z-0">
          <div className="absolute inset-0 opacity-5">
            <svg
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Platform Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--primary-5)] text-[var(--primary-12)]">
                  <span className="flex h-2 w-2 rounded-full bg-[var(--primary-9)] mr-2"></span>
                  Hackathon Platform For Innovators
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--primary-12)] tracking-tighter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="relative">
                  <span className="relative z-10">Unite. Create.</span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-[var(--primary-5)] z-0" />
                </span>
                <br />
                <span className="text-[var(--primary-11)]">
                  Innovate Together
                </span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-[var(--primary-11)] max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                The all-in-one platform to organize, participate, and judge
                hackathons. Connect with innovators, showcase your skills, and
                build the future together.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Button
                  size="lg"
                  className="bg-[var(--primary-9)] hover:bg-[var(--primary-10)] text-[var(--primary-1)]"
                  asChild
                >
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[var(--primary-7)] text-[var(--primary-11)] hover:bg-[var(--primary-4)]"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div
                className="grid grid-cols-2 gap-4 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-[var(--primary-4)]">
                    <Calendar size={18} className="text-[var(--primary-9)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--primary-11)]">
                    Organize Events
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-[var(--primary-4)]">
                    <Users size={18} className="text-[var(--primary-9)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--primary-11)]">
                    Build Teams
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-[var(--primary-4)]">
                    <Code size={18} className="text-[var(--primary-9)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--primary-11)]">
                    Submit Projects
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-[var(--primary-4)]">
                    <Trophy size={18} className="text-[var(--primary-9)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--primary-11)]">
                    Win Prizes
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image/Illustration */}
            <motion.div
              className="relative h-[400px] lg:h-[500px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-4)] via-[var(--primary-5)] to-[var(--primary-3)] rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Placeholder for an actual illustration - you should replace this */}
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero-illustration.jpg"
                      alt="Hackathon collaboration illustration"
                      fill
                      className="object-contain p-6"
                      priority
                    />

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-16 h-16 bg-[var(--primary-4)] rounded-full flex items-center justify-center"
                      animate={{ y: [0, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      <Code size={28} className="text-[var(--primary-11)]" />
                    </motion.div>

                    <motion.div
                      className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-[var(--primary-6)] rounded-full flex items-center justify-center"
                      animate={{ y: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                    >
                      <Users size={24} className="text-[var(--primary-1)]" />
                    </motion.div>

                    <motion.div
                      className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-[var(--primary-9)] rounded-full flex items-center justify-center"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.5,
                        delay: 0.5,
                      }}
                    >
                      <Trophy size={20} className="text-[var(--primary-1)]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="fill-[var(--primary-1)] w-full h-auto"
            viewBox="0 0 1440 74"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,37L48,46.3C96,56,192,74,288,64.2C384,56,480,19,576,9.3C672,0,768,19,864,32.7C960,47,1056,56,1152,55.5C1248,56,1344,47,1392,42.2L1440,37L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z" />
          </svg>
        </div>
      </section>
    </div>
  );
}

export default Page;
