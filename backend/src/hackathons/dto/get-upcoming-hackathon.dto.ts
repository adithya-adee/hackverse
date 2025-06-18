export interface UpcomingHackathonDto {
  id: string;
  title: string;
  description: string;
  bannerImageUrl: string | null;
  startDate: Date;
  mode: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  maxTeamSize: number;
  tags: string[];
  registeredParticipants: number;
}
