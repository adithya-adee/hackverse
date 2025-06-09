import {
  User,
  Hackathon,
  RoleRequest,
  Submission,
  Team,
} from "@/types/core_interfaces";

export interface UsersResponse {
  users: User[];
  count: number;
}

export interface HackathonsResponse {
  response: Hackathon[];
  count: number;
}

export interface TeamsResponse {
  count: number;
  teams?: Team[];
}

export interface SubmissionsResponse {
  submissions: Submission[];
  count: number;
}

export interface DashboardData {
  roleRequests: RoleRequest[];
  roleRequestsLoading: boolean;
  roleRequestsError: unknown;
  refetchRoleRequests: () => void;

  userData?: UsersResponse;
  userDataLoading: boolean;
  userDataError: unknown;
  refetchUsers: () => void;

  hackathonData?: HackathonsResponse;
  hackathonLoading: boolean;
  hackathonError: unknown;
  refetchHackathons: () => void;

  teamsData?: TeamsResponse;
  teamsLoading: boolean;
  teamsError: unknown;
  refetchTeams: () => void;

  submissionsData?: SubmissionsResponse;
  submissionsLoading: boolean;
  submissionsError: unknown;
  refetchSubmissions: () => void;

  totalUsers: number;
  activeHackathons: number;
  hackathonCount: number;
  teamCount: number;
  submissionCount: number;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshDashboard: () => void;
}

export interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.FC<{ className?: string }>;
}

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
