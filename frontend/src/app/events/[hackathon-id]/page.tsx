"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Users,
  Globe,
  Clock,
  User,
  Tag,
  Trophy,
  Share2,
} from "lucide-react";
import { sampleHackathonData } from "@/assets/data/hackathon_individual_.data";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { toast } from "sonner";

// Types
export interface FindHackathonDto {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  registrationDate: Date;
  location?: string;
  maxTeamSize: number;
  mode: "ONLINE" | "OFFLINE" | "HYBRID";
  status: "UPCOMING" | "LIVE" | "COMPLETED";
  bannerImageUrl?: string;
  createdBy: {
    id: string;
    name: string;
    profileImageUrl?: string;
  };
  registeredParticipants: number;
  tags: string[];
  tabs: {
    title: string;
    content: string; // Markdown content
  }[];
}

const Page = () => {
  const params = useParams();
  const hackathonId = params["hackathon-id"];

  // const [hackathon, setHackathon] = useState<FindHackathonDto>(sampleHackathonData.aiHackathon);
  const hackathon: FindHackathonDto = sampleHackathonData.healthHackathon;
  const [activeTab, setActiveTab] = useState(0);

  //Mock API call - replace with your actual API call
  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        console.log(hackathonId);
        // Replace this with your actual API call
        // const response = await fetch(`/api/hackathons/${hackathonId}`);
        // setHackathon(response);
      } catch (err) {
        console.error("Error fetching hackathon:", err);
      }
    };
    if (hackathonId) {
      fetchHackathon();
    }
  }, [hackathonId]);

  const formatDate = (dateString: Date) => {
    return dateString.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      UPCOMING: "bg-blue-100 text-blue-800",
      LIVE: "bg-green-100 text-green-800",
      COMPLETED: "bg-gray-100 text-gray-800",
    };

    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status as keyof typeof statusStyles]}`}
      >
        {status}
      </motion.span>
    );
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading hackathon details...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error || !hackathon) {
  if (!hackathon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg font-bold mb-4">
            {/* {error || "Hackathon not found"} */}
            {"Hackathon not found"}
          </p>
          <button
            onClick={() => window.history.back()}
            className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--primary-1)] to-[var(--primary-3)]">
      {/* Banner Section */}
      <div className="w-full h-[10-vh] mt-16"></div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          {hackathon.bannerImageUrl && (
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={hackathon.bannerImageUrl}
              alt={hackathon.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute inset-0">
          <div className="container mx-auto px-6 h-full flex items-end pb-12">
            <div className="text-white max-w-4xl">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
              >
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                >
                  <Trophy className="w-8 h-8 text-yellow-300" />
                </motion.div>
                {getStatusBadge(hackathon.status)}
              </motion.div>

              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent"
              >
                {hackathon.title}
              </motion.h1>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-6 mt-6 text-sm opacity-80 animation-delay-600"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(hackathon.startDate)}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {hackathon.registeredParticipants} participants
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tags & description */}
      <div className="mx-auto px-25 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 p-2"
        >
          {hackathon.tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="px-3 py-2 text-xs font-bold rounded-full border"
              style={{
                backgroundColor: "var(--primary-3)",
                color: "var(--primary-11)",
                borderColor: "var(--primary-6)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-xl font p-2 text-[var(--primary-12)]"
        >
          <p>{hackathon.description}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="container mx-auto px-25 py-8 "
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 ">
            {/* Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mb-6"
            >
              {/* Tabs */}
              <div className="shadow-sm rounded-2xl border-gray-300">
                <nav className="flex space-x-8 px-6">
                  {hackathon.tabs.map((tab, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-full m-2 p-3 font-bold text-sm  rounded-xl ${activeTab === index
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : " text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                      {tab.title}
                    </motion.button>
                  ))}
                </nav>
              </div>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div
                  className="prose prose-sm text-[var(--primary-11)] 
                  prose-headings:text-[var(--primary-12)]"
                >
                  <ReactMarkdown>
                    {hackathon.tabs[activeTab].content}
                  </ReactMarkdown>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Organizer Card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[var(--primary-2)] rounded-lg shadow-sm p-6 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold mb-4">Organized by</h3>
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200"
                >
                  {hackathon.createdBy.profileImageUrl ? (
                    <img
                      src={hackathon.createdBy.profileImageUrl}
                      alt={hackathon.createdBy.name}
                      // fill
                      className="object-cover fill-background"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
                <div>
                  <p className="font-medium">{hackathon.createdBy.name}</p>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
            </motion.div>

            {/* Event Details Card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-[var(--primary-2)] rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Calendar,
                    label: "Start Date",
                    value: formatDate(hackathon.startDate),
                    color: "text-gray-600 dark:text-white",
                  },
                  {
                    icon: Clock,
                    label: "End Date",
                    value: formatDate(hackathon.endDate),
                    color: "text-gray-600 dark:text-red-500",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: hackathon.location || "TBD",
                    color: "text-gray-600 dark:text-green-500",
                  },
                  {
                    icon: Globe,
                    label: "Mode",
                    value: hackathon.mode,
                    color: "text-gray-600 dark:text-blue-500",
                  },
                  {
                    icon: Users,
                    label: "Max Team Size",
                    value: `${hackathon.maxTeamSize} members`,
                    color: "text-gray-600 dark:text-yellow-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <item.icon className={`w-5 h-5 ${item.color} mt-0.5`} />
                    </motion.div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Register Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-[var(--primary-2)] rounded-lg shadow-sm p-6"
            >
              <div className="flex flex-col space-y-3">
                {/* Register button */}
                <Link href={`/events/${hackathonId}/register`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    {hackathon.status === "UPCOMING"
                      ? "Register Now"
                      : hackathon.status === "LIVE"
                        ? "Join Now"
                        : "View Results"}
                  </motion.button>
                </Link>

                {/* Share button */}
                <motion.button
                  onClick={() => {
                    // Copy the current URL to clipboard
                    navigator.clipboard.writeText(window.location.href);

                    toast("Link copied to clipboard!", {
                      description: "Share this hackathon with your friends.",
                      duration: 2000,
                    });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm border border-[var(--primary-6)] text-[var(--primary-11)] rounded-lg hover:bg-[var(--primary-3)] transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  Share Hackathon
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
