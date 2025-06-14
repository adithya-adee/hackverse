"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  Code,
  Users,
  Award,
  Star,
  CheckCircle2,
  Target,
  Lightbulb,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  // Team members data
  const leadershipTeam = [
    {
      name: "Adithya A",
      role: "Founder",
      image: "/images/team/sarah-johnson.jpg",
      bio: "Full stack Web Developer",
    },
    {
      name: "Priyanshu Kumar Rai",
      role: "Founder",
      image: "/images/team/michael-chen.jpg",
      bio: "Full-stack developer and architect",
    },
  ];

  // Stats for the platform
  const platformStats = [
    { label: "Hackathons Hosted", value: "500+", icon: Globe },
    { label: "Active Users", value: "30,000+", icon: Users },
    { label: "Projects Submitted", value: "12,000+", icon: Code },
    { label: "Success Stories", value: "250+", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[var(--primary-1)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--primary-2)] via-[var(--primary-3)] to-[var(--primary-4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-[var(--primary-12)] mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Hackverse
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-xl text-[var(--primary-11)] mb-8">
                Empowering innovation through collaborative hackathons and
                community-driven development.
              </p>

              <Separator className="my-6 bg-[var(--primary-6)]" />

              <p className="text-[var(--primary-11)]">
                Founded in 2023, Hackverse is the premier platform connecting
                developers, designers, and innovators to create groundbreaking
                solutions for today's challenges.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
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

      {/* Our Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-[var(--primary-12)] mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-[var(--primary-11)] mb-6">
              At Hackverse, we believe in the power of collaboration to solve
              complex problems. Our mission is to provide a seamless platform
              that brings together diverse talent, fosters innovation, and
              creates opportunities for meaningful technological advancement.
            </p>
            <p className="text-lg text-[var(--primary-11)] mb-6">
              We're committed to democratizing the hackathon experience, making
              it accessible to participants of all skill levels and backgrounds,
              while providing organizers with powerful tools to create impactful
              events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="flex items-start">
                <div className="mr-4 rounded-full p-2 bg-[var(--primary-4)]">
                  <Target size={24} className="text-[var(--primary-9)]" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--primary-12)]">
                    Purposeful Innovation
                  </h3>
                  <p className="text-[var(--primary-11)]">
                    Focusing on solutions that create real-world impact
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex items-start">
                <div className="mr-4 rounded-full p-2 bg-[var(--primary-4)]">
                  <HeartHandshake
                    size={24}
                    className="text-[var(--primary-9)]"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--primary-12)]">
                    Inclusive Community
                  </h3>
                  <p className="text-[var(--primary-11)]">
                    Creating space for diverse voices and perspectives
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl flex items-center justify-center bg-gradient-to-br from-[var(--primary-4)] via-[var(--primary-5)] to-[var(--primary-6)]"
          >
            <div className="absolute inset-0 bg-[var(--primary-12)]/60" />
            <div className="relative z-10 p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary-1)] mb-4">
                "Innovation happens when diverse minds collaborate with
                purpose."
              </h3>
              <p className="text-lg text-[var(--primary-2)]">
                At Hackverse, we foster an environment where creativity,
                teamwork, and technology unite to solve real-world problems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--primary-2)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-[var(--primary-12)] mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-[var(--primary-11)] max-w-3xl mx-auto">
              These principles guide everything we do at Hackverse, from feature
              development to community management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CoreValueCard
              icon={<Sparkles className="h-8 w-8 text-[var(--primary-9)]" />}
              title="Innovation First"
              description="We constantly push boundaries and embrace new ideas, technologies, and approaches to problem-solving."
            />
            <CoreValueCard
              icon={<Users className="h-8 w-8 text-[var(--primary-9)]" />}
              title="Community-Driven"
              description="Our community is at the heart of what we do. We listen, learn, and evolve based on their needs and feedback."
            />
            <CoreValueCard
              icon={
                <CheckCircle2 className="h-8 w-8 text-[var(--primary-9)]" />
              }
              title="Quality & Excellence"
              description="We're committed to delivering exceptional experiences, reliable platform performance, and thoughtful features."
            />
            <CoreValueCard
              icon={<Lightbulb className="h-8 w-8 text-[var(--primary-9)]" />}
              title="Learning & Growth"
              description="We believe everyone has something to teach and something to learn, fostering continuous growth."
            />
            <CoreValueCard
              icon={<Award className="h-8 w-8 text-[var(--primary-9)]" />}
              title="Recognition & Support"
              description="We celebrate achievements and provide resources for participants at every stage of their journey."
            />
            <CoreValueCard
              icon={<Globe className="h-8 w-8 text-[var(--primary-9)]" />}
              title="Global Perspective"
              description="We embrace diverse cultures, backgrounds, and viewpoints to create solutions with worldwide impact."
            />
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-[var(--primary-12)] text-center mb-16">
            Platform Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--primary-3)] rounded-lg p-6 text-center"
              >
                <div className="mx-auto rounded-full bg-[var(--primary-5)] p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-[var(--primary-9)]" />
                </div>
                <h3 className="text-3xl font-bold text-[var(--primary-12)] mb-2">
                  {stat.value}
                </h3>
                <p className="text-[var(--primary-11)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--primary-2)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-[var(--primary-12)] mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-[var(--primary-11)] max-w-3xl mx-auto">
              Meet the experienced professionals guiding Hackverse's vision and
              operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center mx-auto min-w-50 max-w-fit">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[var(--primary-1)] border border-[var(--primary-6)] overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription className="text-[var(--primary-10)]">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[var(--primary-11)]">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-[var(--primary-12)] mb-6">
            Ready to Join the Innovation Community?
          </h2>
          <p className="text-lg text-[var(--primary-11)] mb-8 max-w-2xl mx-auto">
            Whether you're looking to organize a hackathon, participate as a
            competitor, or mentor the next generation of innovators, Hackverse
            has the tools and community to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[var(--primary-9)] hover:bg-[var(--primary-10)] text-[var(--primary-1)]"
              asChild
            >
              <Link href="/register">
                Create an Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[var(--primary-7)] text-[var(--primary-11)] hover:bg-[var(--primary-4)]"
              asChild
            >
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// Core Value Card Component
function CoreValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--primary-1)] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[var(--primary-12)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--primary-11)]">{description}</p>
    </motion.div>
  );
}
