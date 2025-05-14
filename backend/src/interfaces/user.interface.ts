export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface Hackathon {
  id: string;
  name: string;
}
