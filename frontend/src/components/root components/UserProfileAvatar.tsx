"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  User,
  History,
  Trophy,
  Settings,
  ChevronDown,
  UserCog,
  UserLock,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/apiSlice/authSlice";
import { motion } from "motion/react";

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  profileImageUrl?: string;
  roles?: string[];
}

interface Props {
  user: UserData;
}

function UserProfileAvatar({ user }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  // Get initials from name or email
  const getInitials = (): string => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }

    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }

    return "UN";
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/sign-in");
  };

  return (
    <div className="relative z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-2 py-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary-1)] hover:bg-[var(--primary-3)] transition-all">
            <Avatar className="h-8 w-8 border border-[var(--primary-6)] transition-colors">
              <AvatarImage
                src={user?.profileImageUrl}
                alt={user?.name || "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-[var(--primary-9)] to-[var(--primary-8)] text-[var(--primary-1)] text-xs font-medium">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              className={`h-4 w-4 text-[var(--primary-11)] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-56 overflow-hidden border-[var(--primary-6)] bg-[var(--primary-2)] shadow-xl rounded-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 border border-[var(--primary-6)]">
                  <AvatarImage
                    src={user?.profileImageUrl}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-[var(--primary-9)] to-[var(--primary-8)] text-[var(--primary-1)] font-medium">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-[var(--primary-12)] line-clamp-1">
                    {user?.name || "Anonymous User"}
                  </p>
                  <p className="text-xs text-[var(--primary-10)] line-clamp-1">
                    {user?.email || "No email provided"}
                  </p>
                </div>
              </div>

              {user && user.roles && user.roles?.length > 0 ? (
                <div className="mt-2 pt-2 border-t border-[var(--primary-5)] flex flex-wrap gap-1.5">
                  {user.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[var(--primary-4)] text-[var(--primary-11)]"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      {role.charAt(0) + role.slice(1).toLowerCase()}
                    </span>
                  ))}
                </div>
              ) : (
                <div>No Roles</div>
              )}
            </div>

            <DropdownMenuSeparator className="bg-[var(--primary-6)]" />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="flex cursor-pointer items-center px-3 py-2 text-sm text-[var(--primary-11)] hover:bg-[var(--primary-4)] hover:text-[var(--primary-12)] focus:bg-[var(--primary-4)] focus:text-[var(--primary-12)]"
                >
                  <User className="mr-2 h-4 w-4 text-[var(--primary-9)]" />
                  Profile
                </Link>
              </DropdownMenuItem>

              {user.roles?.includes("ADMIN") && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/admin"
                    className="flex cursor-pointer items-center px-3 py-2 text-sm text-[var(--primary-11)] hover:bg-[var(--primary-4)] hover:text-[var(--primary-12)] focus:bg-[var(--primary-4)] focus:text-[var(--primary-12)]"
                  >
                    <UserLock className="mr-2 h-4 w-4 text-[var(--primary-9)]" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              )}

              {user.roles?.includes("ORGANIZER") && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/organiser"
                    className="flex cursor-pointer items-center px-3 py-2 text-sm text-[var(--primary-11)] hover:bg-[var(--primary-4)] hover:text-[var(--primary-12)] focus:bg-[var(--primary-4)] focus:text-[var(--primary-12)]"
                  >
                    <UserCog className="mr-2 h-4 w-4 text-[var(--primary-9)]" />
                    Organizer Dashboard
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/team-requests"
                  className="flex cursor-pointer items-center px-3 py-2 text-sm text-[var(--primary-11)] hover:bg-[var(--primary-4)] hover:text-[var(--primary-12)] focus:bg-[var(--primary-4)] focus:text-[var(--primary-12)]"
                >
                  <Trophy className="mr-2 h-4 w-4 text-[var(--primary-9)]" />
                  Team Requests
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/history"
                  className="flex cursor-pointer items-center px-3 py-2 text-sm text-[var(--primary-11)] hover:bg-[var(--primary-4)] hover:text-[var(--primary-12)] focus:bg-[var(--primary-4)] focus:text-[var(--primary-12)]"
                >
                  <History className="mr-2 h-4 w-4 text-[var(--primary-9)]" />
                  Activity History
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex cursor-pointer items-center px-3 py-2 text-sm text-[var(--primary-11)] hover:bg-[var(--primary-4)] hover:text-[var(--primary-12)] focus:bg-[var(--primary-4)] focus:text-[var(--primary-12)]"
                >
                  <Settings className="mr-2 h-4 w-4 text-[var(--primary-9)]" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-[var(--primary-6)]" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex cursor-pointer items-center px-3 py-2 text-sm text-[var(--destructive)] hover:bg-[var(--destructive)] hover:bg-opacity-10 hover:text-[var(--destructive)]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
              <span className="ml-auto text-xs tracking-widest opacity-60">
                ⇧⌘Q
              </span>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserProfileAvatar;
