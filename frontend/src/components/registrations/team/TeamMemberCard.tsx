"use client";
import React, { JSX, useState } from "react";
import {
  Check,
  X,
  Crown,
  User,
  Mail,
  MapPin,
  Code,
  Calendar,
  Clock,
} from "lucide-react";

interface UserInfo {
  mem: boolean;
  user: {
    name: string;
    email: string;
    type: string;
    institutionName: string;
    profileImageUrl: string;
    Skill: { id: string; name: string }[];
  };
  isLeader?: boolean;
  joinedAt: string;
  badge: JSX.Element;
  actions?: JSX.Element;
}

const TeamMembercard = () => {
  //TODO: Fetch all the team members...
  const [teamMembers] = useState([
    {
      teamId: "team-550e8400-e29b-41d4-a716-446655440001",
      userId: "550e8400-e29b-41d4-a716-446655440002",
      isLeader: true,
      joinedAt: "2024-03-01T10:00:00.000Z",
      Team: {
        id: "team-550e8400-e29b-41d4-a716-446655440001",
        name: "AI Pioneers",
        description:
          "We're passionate about using AI to solve real-world problems. Looking for team members with machine learning and backend development skills.",
        requiredSkills: "Machine Learning, Python, TensorFlow",
      },
      User: {
        id: "550e8400-e29b-41d4-a716-446655440002",
        name: "Bob Smith",
        email: "bob.smith@email.com",
        type: "PROFESSIONAL",
        institutionName: "NITK",
        profileImageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        biography:
          "Machine Learning Engineer specializing in computer vision and NLP. Love building AI-powered applications and mentoring junior developers.",
        Skill: [
          {
            id: "skill-550e8400-e29b-41d4-a716-446655440004",
            name: "Machine Learning",
          },
          { id: "skill-550e8400-e29b-41d4-a716-446655440005", name: "Python" },
          {
            id: "skill-550e8400-e29b-41d4-a716-446655440006",
            name: "TensorFlow",
          },
        ],
      },
    },
    {
      teamId: "team-550e8400-e29b-41d4-a716-446655440001",
      userId: "550e8400-e29b-41d4-a716-446655440004",
      isLeader: false,
      joinedAt: "2024-03-05T14:30:00.000Z",
      Team: {
        id: "team-550e8400-e29b-41d4-a716-446655440001",
        name: "AI Pioneers",
        description:
          "We're passionate about using AI to solve real-world problems. Looking for team members with machine learning and backend development skills.",
        requiredSkills: "Machine Learning, Python, TensorFlow",
      },
      User: {
        id: "550e8400-e29b-41d4-a716-446655440004",
        name: "David Chen",
        email: "david.chen@email.com",
        type: "PROFESSIONAL",
        institutionName: "NITK",
        profileImageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        biography:
          "Backend developer specializing in microservices architecture and cloud computing. Experience with AWS, Docker, and Kubernetes.",
        Skill: [
          { id: "skill-550e8400-e29b-41d4-a716-446655440010", name: "Java" },
          { id: "skill-550e8400-e29b-41d4-a716-446655440011", name: "AWS" },
          { id: "skill-550e8400-e29b-41d4-a716-446655440012", name: "Docker" },
        ],
      },
    },
  ]);

  //TODO: fech all the Team reqs for/from a perticular team.
  const [teamRequests, setTeamRequests] = useState([
    {
      teamId: "team-550e8400-e29b-41d4-a716-446655440002",
      userId: "550e8400-e29b-41d4-a716-446655440003",
      requestedAt: "2024-04-16T10:30:00.000Z",
      expiresAt: "2024-04-23T10:30:00.000Z",
      team: {
        id: "team-550e8400-e29b-41d4-a716-446655440002",
        name: "Web3 Warriors",
        description:
          "Building the next generation of decentralized applications. We focus on DeFi solutions and smart contract development.",
        requiredSkills: "Solidity, JavaScript, React, Web3.js",
      },
      user: {
        id: "550e8400-e29b-41d4-a716-446655440003",
        name: "Carol Williams",
        email: "carol.williams@email.com",
        type: "PROFESSIONAL",
        institutionName: "NITK",
        profileImageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        biography:
          "UX/UI Designer with a background in psychology. Focused on creating user-centered designs and improving accessibility in web applications.",
        Skill: [
          {
            id: "skill-550e8400-e29b-41d4-a716-446655440007",
            name: "UI/UX Design",
          },
          { id: "skill-550e8400-e29b-41d4-a716-446655440008", name: "Figma" },
        ],
      },
    },
    {
      teamId: "team-550e8400-e29b-41d4-a716-446655440005",
      userId: "550e8400-e29b-41d4-a716-446655440004",
      requestedAt: "2024-06-16T09:20:00.000Z",
      expiresAt: "2024-06-23T09:20:00.000Z",
      team: {
        id: "team-550e8400-e29b-41d4-a716-446655440005",
        name: "Mobile Mavericks",
        description:
          "Creating amazing mobile experiences that users love. We specialize in cross-platform development and user-centered design.",
        requiredSkills: "React Native, Flutter, UI/UX Design, Firebase",
      },
      user: {
        id: "550e8400-e29b-41d4-a716-446655440004",
        name: "David Chen",
        email: "david.chen@email.com",
        type: "PROFESSIONAL",
        institutionName: "NITK",
        profileImageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        biography:
          "Backend developer specializing in microservices architecture and cloud computing. Experience with AWS, Docker, and Kubernetes.",
        Skill: [
          { id: "skill-550e8400-e29b-41d4-a716-446655440010", name: "Java" },
          { id: "skill-550e8400-e29b-41d4-a716-446655440011", name: "AWS" },
          { id: "skill-550e8400-e29b-41d4-a716-446655440012", name: "Docker" },
        ],
      },
    },
  ]);

  //TODO
  const handleAcceptRequest = (userId: string) => {
    setTeamRequests((prev) => prev.filter((req) => req.userId !== userId));
    // In a real app, you would make an API call to accept the request
    console.log(`Accepted request for user: ${userId}`);
  };

  //TODO:
  const handleRejectRequest = (userId: string) => {
    setTeamRequests((prev) => prev.filter((req) => req.userId !== userId));
    // In a real app, you would make an API call to reject the request
    console.log(`Rejected request for user: ${userId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpiringSoon = (expiresAt: string) => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const diffHours = (expiry - now) / (1000 * 60 * 60);
    return diffHours <= 24 && diffHours > 0;
  };

  const UserCard = ({
    user,
    isLeader,
    joinedAt,
    badge,
    actions,
    mem,
  }: UserInfo) => (
    <div
      className={` ${mem ? "dark:bg-white/5 bg-green-100 " : "bg-yellow-50 dark:bg-white/5"}  w-full rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={user.profileImageUrl}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
            />
            {isLeader && (
              <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                <Crown className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--primary-12)] flex items-center gap-2">
              {user.name}
              {isLeader && (
                <span className="text-sm text-yellow-600 font-medium">
                  Leader
                </span>
              )}
            </h3>
            <div className="flex items-center gap-1 text-[var(--primary-12)] text-sm">
              <User className="w-4 h-4" />
              <span className="capitalize">{user.type.toLowerCase()}</span>
            </div>
          </div>
        </div>
        {badge}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Mail className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-[var(--primary-12)]">{user.email}</span>
        </div>

        {user.institutionName && (
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="text-sm text-[var(--primary-12)]">
              {user.institutionName}
            </span>
          </div>
        )}

        {joinedAt && (
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-[var(--primary-12)]">
              Joined: {formatDate(joinedAt)}
            </span>
          </div>
        )}

        {/* {user.biography && (
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            {user.biography}
          </p>
        )} */}

        {user.Skill && user.Skill.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-[var(--primary-12)]">
                Skills:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.Skill.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {actions && (
          <div className="mt-4 pt-4 border-t border-gray-200">{actions}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--primary-1)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Team Members Section */}
        <div className="flex gap-3 mb-6">
          <div className="flex items-center bg-green-100 p-2 rounded-lg dark:bg-white/10">
            <Check className="w-3 h-3 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-[var(--primary-12)]">
            Team Members ({teamMembers.length})
          </h2>
        </div>
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <UserCard
                key={member.userId}
                mem={true}
                user={member.User}
                isLeader={member.isLeader}
                joinedAt={member.joinedAt}
                badge={
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-300 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Verified
                    </span>
                  </div>
                }
              />
            ))}
          </div>
        </div>

        {/* Team Requests Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Clock className="w-3 h-3 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-[var(--primary-12)]">
              Pending Requests ({teamRequests.length})
            </h2>
          </div>

          {teamRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-500 mb-2">
                No Pending Requests
              </h3>
              <p className="text-gray-400">
                All team requests have been processed.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamRequests.map((request) => (
                <UserCard
                  key={request.userId}
                  mem={false}
                  user={request.user}
                  joinedAt={request.requestedAt}
                  badge={
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 px-3 py-1 bg-yellow-200 rounded-full">
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Pending
                        </span>
                      </div>
                      {isExpiringSoon(request.expiresAt) && (
                        <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full text-center">
                          Expires Soon
                        </div>
                      )}
                    </div>
                  }
                  actions={
                    <div className="space-y-3">
                      <div className="text-xs text-gray-500">
                        <div>Requested: {formatDate(request.requestedAt)}</div>
                        <div>Expires: {formatDate(request.expiresAt)}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptRequest(request.userId)}
                          className="flex-1 bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.userId)}
                          className="flex-1 bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMembercard;
