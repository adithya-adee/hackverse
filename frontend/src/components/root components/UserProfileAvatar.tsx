"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  User,
  History,
  Trophy,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/apiSlice/authSlice";

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  profileImageUrl?: string;
  role?: string;
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

    return "HOT NOT FOUND";
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/sign-in");
  };

  return (
    <div className="relative z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-[var(--primary-8)] focus:ring-offset-2 focus:ring-offset-[var(--primary-1)] p-1 rounded-full transition-all duration-200">
            <Avatar className="h-9 w-9 border-2 border-[var(--primary-6)] hover:border-[var(--primary-8)] transition-colors duration-200 shadow-sm">
              <AvatarImage
                src={user?.profileImageUrl}
                alt={user?.name || "User"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-[var(--primary-9)] to-[var(--primary-8)] text-white text-xs font-medium">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              className={`h-4 w-4 text-[var(--primary-11)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 mt-2 backdrop-blur-md bg-[var(--primary-2)]/95 border border-[var(--primary-6)] shadow-xl rounded-xl animate-in slide-in-from-top-5 duration-200"
        >
          <div className="px-3 pt-2 pb-1">
            <div className="font-medium text-[var(--primary-12)]">
              {user?.name || "User"}
            </div>
            <div className="text-xs text-[var(--primary-10)] truncate">
              {user?.email}
            </div>
          </div>

          <DropdownMenuSeparator className="bg-[var(--primary-5)]" />

          <DropdownMenuGroup>
            <Link href="/dashboard">
              <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-[var(--primary-4)] hover:bg-[var(--primary-4)]">
                <User className="h-4 w-4 text-[var(--primary-9)]" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>

            <Link href="/dashboard/team-requests">
              <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-[var(--primary-4)] hover:bg-[var(--primary-4)]">
                <Trophy className="h-4 w-4 text-[var(--primary-9)]" />
                <span>Requests</span>
              </DropdownMenuItem>
            </Link>

            <Link href="/dashboard/history">
              <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-[var(--primary-4)] hover:bg-[var(--primary-4)]">
                <History className="h-4 w-4 text-[var(--primary-9)]" />
                <span>History</span>
              </DropdownMenuItem>
            </Link>

            <Link href="/dashboard/settings">
              <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-[var(--primary-4)] hover:bg-[var(--primary-4)]">
                <Settings className="h-4 w-4 text-[var(--primary-9)]" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-[var(--primary-5)]" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-500 gap-2 cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/30 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserProfileAvatar;
