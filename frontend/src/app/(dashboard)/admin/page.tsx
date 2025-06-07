"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useGetRoleRequestQuery } from "@/apiSlice/roleRequestApiSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart3,
  Users,
  Calendar,
  Activity,
  Award,
  MessageSquare,
  Layers,
  Settings,
  Search,
  ChevronDown,
  Sparkles,
  UserPlus,
  Lock,
  Trash2,
  Eye,
  Filter,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";
import { RoleRequest } from "@/types/core_interfaces";

// Mock data
const stats = [
  { title: "Total Users", value: "2,856", change: "+12%", icon: Users },
  { title: "Active Hackathons", value: "8", change: "+3", icon: Calendar },
  { title: "Teams Registered", value: "342", change: "+28", icon: Activity },
  { title: "Submissions", value: "187", change: "+16%", icon: Award },
];

const recentUsers = [
  {
    id: "1",
    name: "Sophia Chen",
    email: "sophia@example.com",
    role: "PARTICIPANT",
    joinedAt: "2023-10-15",
    imageUrl: "/avatars/sophia.png",
  },
  {
    id: "2",
    name: "James Wilson",
    email: "james@example.com",
    role: "ORGANIZER",
    joinedAt: "2023-10-14",
    imageUrl: "/avatars/james.png",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma@example.com",
    role: "MENTOR",
    joinedAt: "2023-10-12",
    imageUrl: "/avatars/emma.png",
  },
  {
    id: "4",
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "MODERATOR",
    joinedAt: "2023-10-10",
    imageUrl: "/avatars/michael.png",
  },
];

const hackathons = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    startDate: "2023-11-01",
    endDate: "2023-11-10",
    status: "UPCOMING",
    teamsCount: 42,
  },
  {
    id: "2",
    title: "Web3 Hackathon",
    startDate: "2023-10-15",
    endDate: "2023-10-25",
    status: "ONGOING",
    teamsCount: 78,
  },
  {
    id: "3",
    title: "Mobile App Competition",
    startDate: "2023-09-10",
    endDate: "2023-09-20",
    status: "COMPLETED",
    teamsCount: 63,
  },
];

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const {
    data: roleRequests,
    isLoading: roleRequestsLoading,
    error: roleRequestsError,
  } = useGetRoleRequestQuery(undefined);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-2)] p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-[var(--primary-12)]">
              Admin Dashboard
            </h1>
            <p className="text-[var(--primary-11)]">
              Manage your platform and users
            </p>
          </motion.div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Quick Actions
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Quick Actions</DialogTitle>
                  <DialogDescription>
                    Perform common admin tasks quickly
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <UserPlus className="h-6 w-6" />
                    Create User
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <Calendar className="h-6 w-6" />
                    New Hackathon
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-6 w-6" />
                    Send Announcement
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                  >
                    <Lock className="h-6 w-6" />
                    Manage Permissions
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-5 gap-2 h-auto p-1 w-full max-w-4xl mx-auto">
            <TabsTrigger
              value="overview"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="hackathons"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Hackathons
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Requests
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="py-2 data-[state=active]:bg-[var(--primary-9)] data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  custom={index}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-md font-medium text-[var(--muted-foreground)]">
                          {stat.title}
                        </CardTitle>
                        <div className="p-1 bg-[var(--primary-4)] rounded-md">
                          <stat.icon className="h-5 w-5 text-[var(--primary-10)]" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold text-[var(--primary-12)]">
                        {stat.value}
                      </div>
                      <div className="flex items-center mt-1 text-xs">
                        <Badge className="bg-[var(--primary-5)] text-[var(--primary-12)]">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          {stat.change}
                        </Badge>
                        <span className="ml-1.5 text-[var(--muted-foreground)]">
                          vs previous month
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Recent Activity & Role Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Users */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="lg:col-span-2"
              >
                <Card className="shadow-lg h-full border-0">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Users</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[var(--primary-10)]"
                      >
                        See all
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent">
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentUsers.map((user) => (
                            <TableRow
                              key={user.id}
                              className="hover:bg-[var(--primary-2)]"
                            >
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={user.imageUrl} />
                                    <AvatarFallback className="bg-[var(--primary-5)]">
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-semibold">
                                      {user.name}
                                    </div>
                                    <div className="text-sm text-[var(--muted-foreground)]">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="bg-[var(--primary-3)] text-[var(--primary-11)] border-[var(--primary-7)]"
                                >
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-[var(--muted-foreground)]">
                                {new Date(user.joinedAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-500"
                                  >
                                    <Lock className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Role Requests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="shadow-lg h-full border-0">
                  <CardHeader className="pb-2">
                    <CardTitle>Pending Role Requests</CardTitle>
                    <CardDescription>
                      Approve or reject role requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {roleRequestsLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="h-8 w-8 rounded-full border-4 border-t-transparent border-[var(--primary-9)] animate-spin"></div>
                      </div>
                    ) : roleRequestsError ? (
                      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-center">
                        <p>Failed to load role requests</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => window.location.reload()}
                        >
                          Retry
                        </Button>
                      </div>
                    ) : !roleRequests || roleRequests.length === 0 ? (
                      <div className="p-4 rounded-lg bg-[var(--primary-2)] border border-[var(--primary-6)] text-center">
                        <p className="text-[var(--muted-foreground)]">
                          No pending role requests
                        </p>
                      </div>
                    ) : (
                      roleRequests.map((request: RoleRequest) => (
                        <div
                          key={request.id}
                          className="p-4 rounded-lg bg-[var(--primary-2)] border border-[var(--primary-6)] flex flex-col gap-3"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">
                                {request.User?.name || "Unknown User"}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                                <Badge
                                  variant="secondary"
                                  className="bg-[var(--primary-5)]"
                                >
                                  {request.Role?.name}
                                </Badge>
                                <span>·</span>
                                <span>
                                  {new Date(
                                    request.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-[var(--muted-foreground)] mt-2 line-clamp-2">
                                {request.reason}
                              </p>
                            </div>
                            <Badge
                              className={
                                request.status === "PENDING"
                                  ? "bg-amber-100 text-amber-800 border-amber-300"
                                  : request.status === "APPROVED"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : "bg-red-100 text-red-800 border-red-300"
                              }
                            >
                              {request.status}
                            </Badge>
                          </div>
                          {request.status === "PENDING" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)] flex-1"
                                onClick={() => handleApproveRequest(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    <Button
                      variant="ghost"
                      className="w-full text-[var(--primary-10)]"
                      onClick={() => setActiveTab("requests")}
                    >
                      View all requests
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        className="pl-9 w-64"
                      />
                    </div>
                    <Button className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center py-4 text-[var(--muted-foreground)]">
                  User management content will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HACKATHONS TAB */}
          <TabsContent value="hackathons">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Hackathon Management</CardTitle>
                  <Button className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]">
                    <Calendar className="h-4 w-4 mr-2" />
                    Create Hackathon
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Title</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Teams</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hackathons.map((hackathon) => (
                        <TableRow
                          key={hackathon.id}
                          className="hover:bg-[var(--primary-2)]"
                        >
                          <TableCell>
                            <div className="font-semibold">
                              {hackathon.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-[var(--muted-foreground)]">
                              {new Date(
                                hackathon.startDate
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(hackathon.endDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>{hackathon.teamsCount}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                hackathon.status === "ONGOING"
                                  ? "bg-green-100 text-green-800 border-green-300"
                                  : hackathon.status === "UPCOMING"
                                    ? "bg-blue-100 text-blue-800 border-blue-300"
                                    : "bg-gray-100 text-gray-800 border-gray-300"
                              }
                            >
                              {hackathon.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REQUESTS TAB - Enhanced with more details */}
          <TabsContent value="requests">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Role Requests</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search requests..."
                        className="pl-9 w-64"
                      />
                    </div>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {roleRequestsLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-[var(--primary-9)] animate-spin"></div>
                  </div>
                ) : roleRequestsError ? (
                  <div className="p-8 rounded-lg bg-red-50 border border-red-200 text-red-800 text-center max-w-md mx-auto">
                    <p className="text-lg font-semibold">
                      Failed to load role requests
                    </p>
                    <p className="mt-2 mb-4">
                      There was an error loading the role requests. Please try
                      again.
                    </p>
                    <Button
                      variant="outline"
                      className="border-red-300 text-red-700"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </div>
                ) : !roleRequests || roleRequests.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                      No role requests
                    </h3>
                    <p className="text-gray-500 mt-1 max-w-sm mx-auto">
                      When users request role changes, they will appear here for
                      your review.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>User</TableHead>
                        <TableHead>Requested Role</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roleRequests.map((request: RoleRequest) => (
                        <TableRow
                          key={request.id}
                          className="hover:bg-[var(--primary-2)]"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-[var(--primary-5)]">
                                  {(request.User?.name || "?")[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">
                                  {request.User?.name || "Unknown"}
                                </div>
                                <div className="text-sm text-[var(--muted-foreground)]">
                                  {request.User?.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-[var(--primary-3)] text-[var(--primary-11)] border-[var(--primary-7)]"
                            >
                              {request.Role?.name}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <p
                              className="max-w-xs truncate"
                              title={request.reason}
                            >
                              {request.reason}
                            </p>
                          </TableCell>
                          <TableCell className="text-[var(--muted-foreground)]">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                request.status === "PENDING"
                                  ? "bg-amber-100 text-amber-800 border-amber-300"
                                  : request.status === "APPROVED"
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : "bg-red-100 text-red-800 border-red-300"
                              }
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {request.status === "PENDING" ? (
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="sm"
                                  className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-300 text-red-700"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View details
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-4 text-[var(--muted-foreground)]">
                  Settings content will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}

// Add these functions at the appropriate place in your code
function handleApproveRequest(id: string) {
  // Implementation for approving a role request
  console.log("Approving request:", id);
}

function handleRejectRequest(id: string) {
  // Implementation for rejecting a role request
  console.log("Rejecting request:", id);
}
