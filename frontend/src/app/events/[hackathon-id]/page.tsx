"use client";

// THIS IS NOT COMPLETED YET-----EVERYTHING IS HARDCODED

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Globe, Clock, User, Tag } from "lucide-react";
import { sampleHackathonData } from "@/assets/data/hackathon_individual_.data";
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
  const hackathonId = params?.hackathonId as string;

  // const [hackathon, setHackathon] = useState<FindHackathonDto>(sampleHackathonData.aiHackathon);
  const hackathon: FindHackathonDto = sampleHackathonData.aiHackathon;
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  // // Mock API call - replace with your actual API call
  // useEffect(() => {
  //   const fetchHackathon = async () => {
  //     try {
  //       console.log(hackathonId);
  //       setLoading(true);
  //       // Replace this with your actual API call
  //       // const response = await fetch(`/api/hackathons/${hackathonId}`);
  //       // const data = await response.json();

  //       // Mock data for demonstration - replace with actual API call
  //       const mockHackathon: FindHackathonDto = sampleHackathonData.aiHackathon;

  //       setHackathon(mockHackathon);
  //     } catch (err) {
  //       setError("Failed to fetch hackathon details");
  //       console.error("Error fetching hackathon:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (hackathonId) {
  //     fetchHackathon();
  //   }
  // }, [hackathonId]);

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
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status as keyof typeof statusStyles]}`}
      >
        {status}
      </span>
    );
  };

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering - you might want to use a proper markdown library like react-markdown
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-bold mb-4 mt-6">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-semibold mb-3 mt-4">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-medium mb-2 mt-3">
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.substring(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
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
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-red-600 text-lg mb-4">
  //           {error || "Hackathon not found"}
  //         </p>
  //         <button
  //           onClick={() => window.history.back()}
  //           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  //         >
  //           Go Back
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {hackathon.bannerImageUrl && (
          <img
            src={hackathon.bannerImageUrl}
            alt={hackathon.title}
            className="object-cover fill-background"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {hackathon.title}
                </h1>
                {getStatusBadge(hackathon.status)}
              </div>
              <p className="text-lg opacity-90 max-w-3xl">
                {hackathon.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {hackathon.tabs.map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === index
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="p-6">
                <div className="prose max-w-none">
                  {renderMarkdown(hackathon.tabs[activeTab].content)}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(hackathon.startDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">End Date</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(hackathon.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">
                      {hackathon.location || "TBD"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Mode</p>
                    <p className="text-sm text-gray-600">{hackathon.mode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Max Team Size</p>
                    <p className="text-sm text-gray-600">
                      {hackathon.maxTeamSize} members
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Organized by</h3>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
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
                </div>
                <div>
                  <p className="font-medium">{hackathon.createdBy.name}</p>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Event Stats</h3>
              <div className="text-center">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600">
                    {hackathon.registeredParticipants}
                  </p>
                  <p className="text-sm text-gray-600">
                    Registered Participants
                  </p>
                </div>
              </div>
            </div>

            {/* Tags Card */}
            {hackathon.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {hackathon.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                {hackathon.status === "UPCOMING"
                  ? "Register Now"
                  : hackathon.status === "LIVE"
                    ? "Join Now"
                    : "View Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
