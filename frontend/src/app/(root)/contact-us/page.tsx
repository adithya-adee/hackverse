"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Send,
    CheckCircle,
    AlertCircle,
    Globe,
    Clock,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setFormStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            toast.success("Message sent successfully! We'll get back to you soon.");
        } catch (error) {
            setFormStatus("error");
            toast.error("Failed to send message. Please try again.");
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            value: "contact@hackverse.io",
            link: "mailto:contact@hackverse.io",
        },
        {
            icon: Phone,
            title: "Phone",
            value: "+1 (555) 123-4567",
            link: "tel:+15551234567",
        },
        {
            icon: MapPin,
            title: "Address",
            value: "123 Innovation Street, San Francisco, CA 94103",
            link: "https://maps.google.com/?q=123+Innovation+Street,+San+Francisco,+CA+94103",
        },
        {
            icon: Globe,
            title: "Website",
            value: "www.hackverse.io",
            link: "https://www.hackverse.io",
        }
    ];

    const faqItems = [
        {
            question: "How can I participate in a hackathon?",
            answer: "You can browse our upcoming hackathons on the events page and register directly through the event page. Most hackathons allow both individual and team participation."
        },
        {
            question: "Do I need to be an experienced developer to join?",
            answer: "Not at all! Our hackathons welcome participants of all skill levels. Many events have beginner tracks and mentorship opportunities to help newcomers."
        },
        {
            question: "How can my company sponsor a hackathon?",
            answer: "We offer various sponsorship packages that provide visibility and engagement with our talented community. Please contact our partnerships team for more details."
        },
        {
            question: "Can I volunteer as a mentor or judge?",
            answer: "Yes! We're always looking for experienced professionals to mentor participants or judge submissions. Please fill out the contact form with your interests and expertise."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-3)] pt-16">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[40vh] overflow-hidden"
            >
                <div className="absolute inset-0">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1200"
                        alt="Contact Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="absolute inset-0">
                    <div className="container mx-auto px-6 h-full flex items-center justify-center">
                        <div className="text-center text-white max-w-3xl">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                <MessageSquare className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                            </motion.div>
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent"
                            >
                                Get in Touch
                            </motion.h1>
                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="text-lg md:text-xl"
                            >
                                We'd love to hear from you! Reach out with any questions or inquiries.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-[var(--primary-2)] rounded-lg shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-[var(--primary-12)] mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-[var(--primary-11)] mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-[var(--primary-6)] rounded-md bg-[var(--primary-1)] text-[var(--primary-12)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-[var(--primary-11)] mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-[var(--primary-6)] rounded-md bg-[var(--primary-1)] text-[var(--primary-12)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-[var(--primary-11)] mb-2">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-[var(--primary-6)] rounded-md bg-[var(--primary-1)] text-[var(--primary-12)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                                        <option value="Sponsorship">Sponsorship</option>
                                        <option value="Hackathon Support">Hackathon Support</option>
                                        <option value="Feature Request">Feature Request</option>
                                        <option value="Bug Report">Bug Report</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-[var(--primary-11)] mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border border-[var(--primary-6)] rounded-md bg-[var(--primary-1)] text-[var(--primary-12)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={formStatus === "submitting"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-colors flex items-center justify-center disabled:opacity-70"
                                >
                                    {formStatus === "submitting" ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            Sending...
                                        </>
                                    ) : formStatus === "success" ? (
                                        <>
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Sent Successfully
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>

                        {/* FAQ Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <h2 className="text-2xl font-bold text-[var(--primary-12)] mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {faqItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                        viewport={{ once: true }}
                                        className="bg-[var(--primary-2)] rounded-lg shadow-sm p-6"
                                    >
                                        <h3 className="text-lg font-medium text-[var(--primary-12)] mb-2">{item.question}</h3>
                                        <p className="text-[var(--primary-11)]">{item.answer}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="bg-[var(--primary-2)] rounded-lg shadow-sm p-8">
                            <h3 className="text-xl font-bold text-[var(--primary-12)] mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                        whileHover={{ y: -2 }}
                                        className="flex items-start gap-4 text-[var(--primary-11)] hover:text-[var(--primary-12)]"
                                    >
                                        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-2 mt-1">
                                            <item.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--primary-12)]">{item.title}</p>
                                            <p className="mt-1">{item.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-[var(--primary-2)] rounded-lg shadow-sm p-8"
                        >
                            <h3 className="text-xl font-bold text-[var(--primary-12)] mb-6">Office Hours</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-5 h-5 text-[var(--primary-9)] mt-1" />
                                    <div>
                                        <p className="font-medium text-[var(--primary-12)]">Monday - Friday</p>
                                        <p className="text-[var(--primary-11)]">9:00 AM - 6:00 PM (PST)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="w-5 h-5 text-[var(--primary-9)] mt-1" />
                                    <div>
                                        <p className="font-medium text-[var(--primary-12)]">Saturday</p>
                                        <p className="text-[var(--primary-11)]">10:00 AM - 2:00 PM (PST)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="w-5 h-5 text-[var(--primary-9)] mt-1" />
                                    <div>
                                        <p className="font-medium text-[var(--primary-12)]">Sunday</p>
                                        <p className="text-[var(--primary-11)]">Closed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-[var(--primary-5)]">
                                <p className="text-[var(--primary-11)]">
                                    <span className="font-medium text-[var(--primary-12)]">Note:</span> During hackathon events, our support team is available 24/7.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-8 text-white"
                        >
                            <h3 className="text-xl font-bold mb-4">Join Our Newsletter</h3>
                            <p className="mb-4">Stay updated with our latest hackathons, workshops, and tech events.</p>
                            <form className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-4 py-2 rounded-lg focus:outline-none text-gray-800"
                                />
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
                                    onClick={() => toast.success("Subscribed to newsletter!")}
                                >
                                    Subscribe
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full h-[400px] mt-8"
            >
                {/* Replace with an actual map component or iframe */}
                <div className="w-full h-full bg-[var(--primary-3)] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-[var(--primary-9)]">
                            Map would be displayed here (using Google Maps, MapBox, etc.)
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}