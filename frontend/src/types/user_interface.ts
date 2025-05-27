// Enums
export enum HackathonStatus {
  UPCOMING = "UPCOMING",
  LIVE = "LIVE",
  COMPLETED = "COMPLETED",
}

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum RoleType {
  PARTICIPANT = "PARTICIPANT",
  ORGANIZER = "ORGANIZER",
  RECRUITER = "RECRUITER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

// Core Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
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
  rules?: string;
  prize?: string;
  maxTeamSize: number; // defaults to 4
  createdById: string;
  startDate: string;
  endDate: string;
  status: HackathonStatus; // defaults to UPCOMING
  bannerImageUrl?: string;
  createdAt: string;
  updatedAt: string;

  User?: User;
  HackathonModerator?: HackathonModerator[];
  HackathonModeratorRequest?: HackathonModeratorRequest[];
  HackathonRegistration?: HackathonRegistration[];
  HackathonTag?: HackathonTag[];
  Submission?: Submission[];
  Team?: Team[];
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  hackathonId: string;
  createdById: string;
  lookingForMembers: boolean; // defaults to false
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
  imageUrls: string[]; // Array of strings
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
  name: RoleType; // Enum, not string
  description?: string;
  createdAt: string;

  RoleRequest?: RoleRequest[];
  UserRole?: UserRole[];
}

export interface Skill {
  id: string;
  name: string; // unique
  createdAt: string;

  User?: User[];
}

export interface Feedback {
  id: string;
  submissionId: string;
  comment: string;
  createdById: string;
  createdAt: string;
  createdBy: string; // Note: This seems redundant with createdById in schema

  Submission?: Submission;
}

export interface Rating {
  id: string;
  submissionId: string;
  raterId: string;
  category: string;
  score: number; // Float in schema
  comment?: string;
  createdAt: string;

  Submission?: Submission;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean; // defaults to false
  createdAt: string;

  User_Message_receiverIdToUser?: User;
  User_Message_senderIdToUser?: User;
}

// Junction Table Interfaces (Composite Primary Keys)
export interface HackathonModerator {
  userId: string; // Part of composite PK
  hackathonId: string; // Part of composite PK
  assignedAt: string;

  Hackathon?: Hackathon;
  User?: User;
}

export interface HackathonModeratorRequest {
  userId: string; // Part of composite PK
  hackathonId: string; // Part of composite PK
  assignedAt: string;
  expiresAt: string;
  status: string; // defaults to "PENDING"

  Hackathon?: Hackathon;
  User?: User;
}

export interface HackathonRegistration {
  userId: string; // Part of composite PK
  hackathonId: string; // Part of composite PK
  registeredAt: string;

  Hackathon?: Hackathon;
  User?: User;
}

export interface HackathonTag {
  id: string;
  name: string; // unique constraint with hackathonId
  hackathonId: string;

  Hackathon?: Hackathon;
}

export interface TeamMember {
  teamId: string; // Part of composite PK
  userId: string; // Part of composite PK
  isLeader: boolean; // defaults to false
  joinedAt: string;

  Team?: Team;
  User?: User;
}

export interface TeamRequest {
  teamId: string; // Part of composite PK
  userId: string; // Part of composite PK
  requestedAt: string;
  expiresAt: string;

  team?: Team; // Note: lowercase 't' in schema
  user?: User; // Note: lowercase 'u' in schema
}

export interface UserRole {
  userId: string; // Part of composite PK
  roleId: string; // Part of composite PK
  assignedAt: string;
  updatedAt: string;

  Role?: Role;
  User?: User;
}

export interface RoleRequest {
  id: string;
  userId: string;
  roleId: string;
  status: RequestStatus; // Enum, defaults to PENDING
  reason: string;
  supportingUrl?: string;
  reviewedById?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;

  Role?: Role;
  User?: User;
}
