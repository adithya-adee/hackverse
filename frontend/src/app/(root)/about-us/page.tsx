"use client";
import React from "react";
import { motion } from "motion/react";
import {
    Users,
    Trophy,
    Code,
    Star,
    Heart,
    Zap,
    BookOpen,
    Github,
    Linkedin,
    Twitter,
} from "lucide-react";
import Link from "next/link";

export default function AboutUsPage() {
    const teamMembers = [
        {
            name: "Alex Johnson",
            role: "Founder & CTO",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400",
            bio: "10+ years of experience in hackathon organization and community building.",
            socials: {
                github: "https://github.com/alexjohnson",
                linkedin: "https://linkedin.com/in/alexjohnson",
                twitter: "https://twitter.com/alexjohnson",
            },
        },
        {
            name: "Mia Chen",
            role: "Community Manager",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            bio: "Passionate about building inclusive developer communities and mentoring.",
            socials: {
                github: "https://github.com/miachen",
                linkedin: "https://linkedin.com/in/miachen",
                twitter: "https://twitter.com/miachen",
            },
        },
        {
            name: "David Park",
            role: "Lead Developer",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
            bio: "Full-stack developer with expertise in event management platforms.",
            socials: {
                github: "https://github.com/davidpark",
                linkedin: "https://linkedin.com/in/davidpark",
                twitter: "https://twitter.com/davidpark",
            },
        },
        {
            name: "Sarah Williams",
            role: "Partnership Lead",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
            bio: "Building relationships with tech companies and sponsors for hackathons.",
            socials: {
                github: "https://github.com/sarahwilliams",
                linkedin: "https://linkedin.com/in/sarahwilliams",
                twitter: "https://twitter.com/sarahwilliams",
            },
        },
    ];

    const values = [
        {
            icon: Code,
            title: "Innovation",
            description: "We foster creativity and cutting-edge solutions through collaborative events.",
        },
        {
            icon: Users,
            title: "Community",
            description: "Building a diverse, inclusive community of developers, designers, and creators.",
        },
        {
            icon: Heart,
            title: "Passion",
            description: "We're driven by our love for technology and problem-solving.",
        },
        {
            icon: Zap,
            title: "Impact",
            description: "Creating platforms where meaningful solutions to real-world problems emerge.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-3)] pt-16">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[50vh] overflow-hidden"
            >
                <div className="absolute inset-0">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200"
                        alt="Team Collaboration"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="absolute inset-0">
                    <div className="container mx-auto px-6 h-full flex items-center justify-center">
                        <div className="text-center text-white max-w-3xl">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                            </motion.div>
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent"
                            >
                                About Hackverse
                            </motion.h1>
                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-lg md:text-xl"
                            >
                                Transforming ideas into reality through collaborative innovation
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="container mx-auto px-6 py-16">
                {/* Our Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold text-[var(--primary-12)] mb-8 text-center">Our Story</h2>
                    <div className="bg-[var(--primary-2)] rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
                        <p className="text-[var(--primary-11)] text-lg mb-6">
                            Hackverse began in 2020 with a simple mission: to create a platform where developers, designers, and innovators could collaborate to build solutions that matter. What started as a small virtual hackathon during the pandemic has grown into a global community of creators.
                        </p>
                        <p className="text-[var(--primary-11)] text-lg mb-6">
                            Our team has organized over 50 hackathons, involving more than 10,000 participants from 70+ countries. We believe in the power of diverse perspectives and collaborative problem-solving to address the world's most pressing challenges.
                        </p>
                        <p className="text-[var(--primary-11)] text-lg">
                            Today, Hackverse continues to evolve, offering not just hackathons but also workshops, mentorship programs, and career opportunities to help participants grow professionally while making a positive impact through technology.
                        </p>
                    </div>
                </motion.div>

                {/* Our Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold text-[var(--primary-12)] mb-8 text-center">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[var(--primary-2)] rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="bg-gradient-to-r from-blue-500 to-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <value.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--primary-12)] mb-2">{value.title}</h3>
                                <p className="text-[var(--primary-11)]">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[var(--primary-12)] mb-8 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="bg-[var(--primary-2)] rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-[var(--primary-12)] mb-1">{member.name}</h3>
                                    <p className="text-[var(--primary-10)] mb-3">{member.role}</p>
                                    <p className="text-[var(--primary-11)] text-sm mb-4">{member.bio}</p>
                                    <div className="flex items-center space-x-4">
                                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-9)] hover:text-[var(--primary-10)]">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-9)] hover:text-[var(--primary-10)]">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-9)] hover:text-[var(--primary-10)]">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-10 max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to join the Hackverse community?</h2>
                        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                            Whether you're looking to participate in a hackathon, mentor others, or sponsor an event, we'd love to have you join our mission.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/events">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow hover:shadow-lg transition-all"
                                >
                                    Browse Hackathons
                                </motion.button>
                            </Link>
                            <Link href="/contact-us">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-transparent text-white font-medium rounded-lg border border-white hover:bg-white/10 transition-colors"
                                >
                                    Contact Us
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}