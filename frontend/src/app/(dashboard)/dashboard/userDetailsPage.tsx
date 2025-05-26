"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Github,
  Linkedin,
  FileText,
  Trophy,
  Users,
  Target,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  UserPlus,
  Edit3,
  Save,
  X,
  PlusIcon,
} from "lucide-react";

import userData from "@/assets/data/user.json";

// --- Types ---
interface UserProps {
  id: string;
  name: string;
  email: string;
  biography: string;
  githubUrl: string;
  linkedinUrl: string;
  profileImageUrl: string;
  resumeUrl: string;
  createdAt: string;
  updatedAt: string;
  skills: Skill[];
  roles: RoleData[];
}

interface Skill {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
}

interface RoleData {
  role: Role;
  assignedAt: string;
}

// --- Component ---
const UserDetailsUpdatePage = () => {
  const [user, setUser] = useState<UserProps>(userData as UserProps);

  const [stats] = useState({
    totalHackathonsParticipated: 3,
    totalSubmissions: 2,
    totalTeamsCreated: 2,
    totalTeamsJoined: 3,
    averageRating: 4.25,
    completedHackathons: 2,
    activeHackathons: 1,
    pendingTeamRequests: 3,
    wonHackathons: 1,
    totalEarnings: 15000,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProps>({ ...user });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUser({ ...formData, updatedAt: new Date().toISOString() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const skills = user.skills || [];
  const roles = user.roles || [];

  return (
    <div className="h-screen bg-background-1 text-foreground p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-12 text-2xl">User Profile</p>
            <p className="text-muted-foreground mt-1">
              Manage your profile information and settings
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-primary text-primary-foreground hover:bg-primary-3 transition duration-200 ease-in"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-primary-9 text-white hover:bg-primary-5 transition duration-200 ease-out"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="hover:bg-primary-11 transition duration-200 ease-out"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-border bg-card text-card-foreground">
              <CardHeader className="text-black rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-primary-1/80">
                  Update your personal information and links
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={isEditing ? formData.name : user.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="transition-all duration-200 bg-background text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={isEditing ? formData.email : user.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10 transition-all duration-200 bg-background text-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="biography">Biography</Label>
                  <Textarea
                    id="biography"
                    name="biography"
                    value={isEditing ? formData.biography : user.biography}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    className="transition-all duration-200 bg-background text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <div className="relative">
                      <Github className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="githubUrl"
                        name="githubUrl"
                        value={isEditing ? formData.githubUrl : user.githubUrl}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10 transition-all duration-200 bg-background text-foreground"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <div className="relative">
                      <Linkedin className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="linkedinUrl"
                        name="linkedinUrl"
                        value={
                          isEditing ? formData.linkedinUrl : user.linkedinUrl
                        }
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10 transition-all duration-200 bg-background text-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileImageUrl">Profile Image URL</Label>
                    <Input
                      id="profileImageUrl"
                      name="profileImageUrl"
                      value={
                        isEditing
                          ? formData.profileImageUrl
                          : user.profileImageUrl
                      }
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="transition-all duration-200 bg-background text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resumeUrl">Resume URL</Label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="resumeUrl"
                        name="resumeUrl"
                        value={isEditing ? formData.resumeUrl : user.resumeUrl}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10 transition-all duration-200 bg-background text-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-sm text-muted-foreground">
                  <p>Created: {formatDate(user.createdAt)}</p>
                  <p>Last Updated: {formatDate(user.updatedAt)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="shadow-lg border-border bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Skills
                </CardTitle>
                <CardDescription>
                  Your technical skills and expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="px-3 py-1 bg-secondary text-secondary-foreground"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                  <Badge
                    variant="outline"
                    className="hover:bg-gray-300 transition duration-200 ease-in"
                  >
                    <PlusIcon />
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Roles Section */}
            <Card className="shadow-lg border-border bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Roles
                </CardTitle>
                <CardDescription>
                  Your platform roles and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.map((roleData, index) => (
                  <div
                    key={roleData.role.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg text-muted-foreground"
                  >
                    <div>
                      <Badge className="mb-1 bg-accent text-accent-foreground">
                        {roleData.role.name}
                      </Badge>
                      <p className="text-sm">{roleData.role.description}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p>Assigned</p>
                      <p>{formatDate(roleData.assignedAt)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-border bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Trophy className="w-5 h-5" />
                  Statistics
                </CardTitle>
                <CardDescription>Your hackathon journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-muted rounded-lg text-muted-foreground">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="w-4 h-4 text-primary mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.totalHackathonsParticipated}
                    </div>
                    <div className="text-xs">Participated</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg text-muted-foreground">
                    <div className="flex items-center justify-center mb-1">
                      <FileText className="w-4 h-4 text-primary mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.totalSubmissions}
                    </div>
                    <div className="text-xs">Submissions</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg text-muted-foreground">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-primary mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.totalTeamsCreated}
                    </div>
                    <div className="text-xs">Teams Created</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg text-muted-foreground">
                    <div className="flex items-center justify-center mb-1">
                      <UserPlus className="w-4 h-4 text-primary mr-1" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.totalTeamsJoined}
                    </div>
                    <div className="text-xs">Teams Joined</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-chart-4" />
                      <span className="text-sm">Average Rating</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {stats.averageRating}/5
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-chart-2" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {stats.completedHackathons}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">Active</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {stats.activeHackathons}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-chart-1" />
                      <span className="text-sm">Won</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {stats.wonHackathons}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-chart-2" />
                      <span className="text-sm">Total Earnings</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      ${stats.totalEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Requests */}
            {stats.pendingTeamRequests > 0 && (
              <Card className="shadow-lg border-border bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-chart-1">
                    <Clock className="w-5 h-5" />
                    Pending Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {stats.pendingTeamRequests}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Team invitations waiting
                    </div>
                    <Button
                      size="sm"
                      className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      View Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsUpdatePage;
