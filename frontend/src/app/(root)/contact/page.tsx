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
  Globe,
  Clock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sendContactEmail } from "@/lib/email";
import Loading from "@/app/loading";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // Validate form data
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        throw new Error("Please fill in all fields");
      }

      // Send email using EmailJS
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      // Reset form and show success message
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      console.error("Contact form error:", error);
      setFormStatus("error");
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "adithya25905@gmail.com",
      link: "mailto:adithya25905@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 7676763455",
      link: "tel:+91 7676763455",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "NITK, Manglore, Karnataka",
      link: "https://hackverse.vercel.app",
    },
    {
      icon: Globe,
      title: "Website",
      value: "hackverse.vercel.app",
      link: "https://hackverse.vercel.app",
    },
  ];

  const faqItems = [
    {
      question: "How can I participate in a hackathon?",
      answer:
        "You can browse our upcoming hackathons on the events page and register directly through the event page. Most hackathons allow both individual and team participation.",
    },
    {
      question: "Do I need to be an experienced developer to join?",
      answer:
        "Not at all! Our hackathons welcome participants of all skill levels. Many events have beginner tracks and mentorship opportunities to help newcomers.",
    },
    {
      question: "How can my company sponsor a hackathon?",
      answer:
        "We offer various sponsorship packages that provide visibility and engagement with our talented community. Please contact our partnerships team for more details.",
    },
    {
      question: "Can I volunteer as a mentor or judge?",
      answer:
        "Yes! We're always looking for experienced professionals to mentor participants or judge submissions. Please fill out the contact form with your interests and expertise.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--primary-1)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--primary-4)] via-[var(--primary-3)] to-[var(--primary-2)] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="h-16 w-16 bg-[var(--primary-5)] rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="h-8 w-8 text-[var(--primary-12)]" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--primary-12)]"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[var(--primary-11)]"
            >
              Have questions or feedback? Our team is here to help you.
            </motion.p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-[var(--primary-6)]">
                <CardHeader>
                  <CardTitle className="text-2xl text-[var(--primary-12)]">
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-[var(--primary-11)]">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-[var(--primary-11)]"
                        >
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="border-[var(--primary-6)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-[var(--primary-11)]"
                        >
                          Email Address
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="border-[var(--primary-6)]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-[var(--primary-11)]"
                      >
                        Subject
                      </label>
                      <Select
                        value={formData.subject}
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger className="border-[var(--primary-6)]">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="Partnership Opportunity">
                            Partnership Opportunity
                          </SelectItem>
                          <SelectItem value="Sponsorship">
                            Sponsorship
                          </SelectItem>
                          <SelectItem value="Hackathon Support">
                            Hackathon Support
                          </SelectItem>
                          <SelectItem value="Feature Request">
                            Feature Request
                          </SelectItem>
                          <SelectItem value="Bug Report">Bug Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-[var(--primary-11)]"
                      >
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="border-[var(--primary-6)] min-h-[120px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full bg-[var(--primary-9)] hover:bg-[var(--primary-10)] text-[var(--primary-1)]"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                          Sending...
                        </>
                      ) : formStatus === "success" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Sent Successfully
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[var(--primary-12)] mb-6">
                Frequently Asked Questions
              </h2>
              <Card className="border-[var(--primary-6)]">
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-[var(--primary-12)]">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[var(--primary-11)]">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Info Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Information Card */}
              <Card className="border-[var(--primary-6)]">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="bg-[var(--primary-4)] rounded-full p-3 group-hover:bg-[var(--primary-5)] transition-colors">
                        <item.icon className="h-5 w-5 text-[var(--primary-9)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--primary-12)]">
                          {item.title}
                        </p>
                        <p className="text-[var(--primary-11)] group-hover:text-[var(--primary-12)] transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Office Hours Card */}
              <Card className="border-[var(--primary-6)]">
                <CardHeader>
                  <CardTitle>Office Hours</CardTitle>
                  <CardDescription>When you can reach our team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-[var(--primary-9)]" />
                    <div>
                      <p className="font-medium text-[var(--primary-12)]">
                        Monday - Friday
                      </p>
                      <p className="text-[var(--primary-11)]">
                        9:00 AM - 6:00 PM (PST)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-[var(--primary-9)]" />
                    <div>
                      <p className="font-medium text-[var(--primary-12)]">
                        Saturday
                      </p>
                      <p className="text-[var(--primary-11)]">
                        10:00 AM - 2:00 PM (PST)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-[var(--primary-9)]" />
                    <div>
                      <p className="font-medium text-[var(--primary-12)]">
                        Sunday
                      </p>
                      <p className="text-[var(--primary-11)]">Closed</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--primary-5)]">
                    <p className="text-[var(--primary-11)]">
                      <span className="font-medium">Note:</span> During
                      hackathon events, our support team is available 24/7.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Card */}
              {/* <Card className="border-[var(--primary-6)] bg-[var(--primary-3)]">
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                  <CardDescription>Subscribe to our newsletter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[var(--primary-11)]">
                    Get the latest information about upcoming hackathons,
                    workshops, and tech events.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="border-[var(--primary-6)] bg-[var(--primary-1)]"
                    />
                    <Button
                      onClick={() => toast.success("Subscribed to newsletter!")}
                      className="bg-[var(--primary-9)] hover:bg-[var(--primary-10)] text-[var(--primary-1)]"
                    >
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card> */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="w-full h-[400px] bg-[var(--primary-3)] rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-4)] to-[var(--primary-3)] flex flex-col items-center justify-center">
            <MapPin className="h-12 w-12 text-[var(--primary-9)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--primary-12)] mb-2">
              Visit Our Campus
            </h3>
            <p className="text-[var(--primary-11)] text-center max-w-md px-4">
              National Institute of Technology Karnataka
              <br />
              NH 66, Surathkal, Mangalore
              <br />
              Karnataka, India - 575025
            </p>
            <div className="mt-6 flex items-center gap-2 text-[var(--primary-9)]">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Open for visitors: Mon-Fri, 9AM-5PM
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
