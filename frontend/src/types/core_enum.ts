// Enums

export enum HackathonMode {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  HYBRID = "HYBRID",
}
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

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNSPECIFIED = "UNSPECIFIED"
}

export enum UserType {
  STUDENT = "STUDENT",
  PROFESSIONAL = "PROFESSIONAL",
  OTHERS = "OTHERS"
}