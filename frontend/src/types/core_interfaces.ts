import {
  HackathonStatus,
  HackathonMode,
  RoleType,
  RequestStatus,
  UserType,
  Sex,
} from "./core_enum";

// Core Interfaces
export interface User {
  id: string;
  name: string;
  phoneNo?: string;
  email: string;
  password?: string;
  institutionName?: string;
  type: keyof typeof UserType;
  gender: keyof typeof Sex;
  biography?: string;
  profileImageUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;

  Hackathon?: Hackathon[];
  HackathonModerator?: HackathonModerator[];
  HackathonModeratorRequest?: HackathonModeratorRequest[];
  HackathonRegistration?: HackathonRegistration[];
  Message_Message_receiverIdToUser?: Message[];
  Message_Message_senderIdToUser?: Message[];
  RoleRequest?: RoleRequest[];
  Submission?: Submission[];
  Team?: Team[];
  TeamMember?: TeamMember[];
  TeamRequest?: TeamRequest[];
  UserRole?: UserRole[];
  Skill?: Skill[];
}

export interface Hackathon {
  id: string;
  title: string;
  description?: string;
  location?: string;
  mode?: keyof typeof HackathonMode;
  maxTeamSize: number;
  minTeamSize: number;
  createdById: string;
  registrationDate: string;
  startDate: string;
  endDate: string;
  status: keyof typeof HackathonStatus;
  bannerImageUrl?: string;
  createdAt: string;
  updatedAt: string;

  User?: User;
  HackathonModerator?: HackathonModerator[];
  HackathonModeratorRequest?: HackathonModeratorRequest[];
  HackathonRegistration?: HackathonRegistration[];
  HackathonTab?: HackathonTab[];
  HackathonTag?: HackathonTag[];
  Submission?: Submission[];
  Team?: Team[];
}

export interface HackathonTab {
  id: string;
  hackathonId: string;
  title: string;
  content: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;

  Hackathon?: Hackathon;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  hackathonId: string;
  createdById: string;
  lookingForMembers: boolean;
  registered: boolean;
  requiredSkills?: string;
  createdAt: string;
  updatedAt: string;

  Submission?: Submission[];
  User?: User;
  Hackathon?: Hackathon;
  TeamMember?: TeamMember[];
  TeamRequest?: TeamRequest[];
}

export interface Submission {
  id: string;
  teamId: string;
  hackathonId: string;
  createdById: string;
  title: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  imageUrls: string[];
  submittedAt: string;
  updatedAt: string;

  Feedback?: Feedback[];
  Rating?: Rating[];
  User?: User;
  Hackathon?: Hackathon;
  Team?: Team;
}

export interface Role {
  id: string;
  name: keyof typeof RoleType;
  description?: string;
  createdAt: string;

  RoleRequest?: RoleRequest[];
  UserRole?: UserRole[];
}

export interface Skill {
  id: string;
  name: string;
  createdAt: string;

  User?: User[];
}

export interface Feedback {
  id: string;
  submissionId: string;
  comment: string;
  createdById: string;
  createdAt: string;
  createdBy: string;

  Submission?: Submission;
}

export interface Rating {
  id: string;
  submissionId: string;
  raterId: string;
  category: string;
  score: number;
  comment?: string;
  createdAt: string;

  Submission?: Submission;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;

  User_Message_receiverIdToUser?: User;
  User_Message_senderIdToUser?: User;
}

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

// Junction Table Interfaces
export interface HackathonModerator {
  userId: string;
  hackathonId: string;
  assignedAt: string;

  Hackathon?: Hackathon;
  User?: User;
}

export interface HackathonModeratorRequest {
  userId: string;
  hackathonId: string;
  assignedAt: string;
  expiresAt: string;
  status: string;

  Hackathon?: Hackathon;
  User?: User;
}

export interface HackathonRegistration {
  userId: string;
  hackathonId: string;
  registeredAt: string;

  Hackathon: Hackathon;
  User: User;
}

export interface HackathonTag {
  id: string;
  name: string;
  hackathonId: string;

  Hackathon?: Hackathon;
}

export interface TeamMember {
  teamId: string;
  userId: string;
  isLeader: boolean;
  joinedAt: string;

  Team?: Team;
  User?: User;
}

export interface TeamRequest {
  teamId: string;
  userId: string;
  requestedAt: string;
  expiresAt: string;

  team?: Team;
  user?: User;
}

export interface UserRole {
  userId: string;
  roleId: string;
  assignedAt: string;
  updatedAt: string;

  Role?: Role;
  User?: User;
}

export interface RoleRequest {
  id: string;
  userId: string;
  roleId: string;
  status: keyof typeof RequestStatus;
  reason: string;
  supportingUrl?: string;
  reviewedById?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;

  Role?: Role;
  User?: User;
}
