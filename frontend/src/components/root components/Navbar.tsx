"use client";

import React, { useDebugValue, useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { initTheme, toggleTheme } from "@/store/themeSlice";
import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react";
import { RootState } from "@/store/store";
import UserProfileAvatar from "./UserProfileAvatar";
import { RoleType } from "@/types/core_enum";

interface UserState {
  id: string,
  email: string,
  name: string,
  roles: Array<RoleType>
}

function Navbar() {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const user: UserState = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  console.log(user)

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch])

  if (!mounted) {
    return <NavbarSkeleton />;
  }

  return (
    <div
      // suppressHydrationWarning
      className="fixed top-0 left-0 w-full z-100 transition-all duration-300 border-b-2 border-[var(--primary-6)] bg-[var(--primary-1)] backdrop-blur-md"
    >
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <a className="flex items-center justify-center" href="/">
          <Logo className="h-18 w-48" />
        </a>

        <div className=" flex gap-5">
          <Link href="/events">
            <button className="cursor-pointer px-4 py-2 text-[var(--primary-12)] hover:text-[var(--primary-10)] font-bold transition-colors">
              Events
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="cursor-pointer px-4 py-2 text-[var(--primary-12)] hover:text-[var(--primary-10)] font-bold transition-colors">
              Dashboard
            </button>
          </Link>
          <Link href="/about-us">
            <button className="cursor-pointer px-4 py-2 text-[var(--primary-12)] hover:text-[var(--primary-10)] font-bold transition-colors">
              About Us
            </button>
          </Link>
        </div>

        <div className="flex gap-3">
          {isLoggedIn && user.roles.find(role => role === RoleType.ORGANIZER) && (
            <>
              <span className="cursor-pointer flex py-2 px-3 border-2 border-[var(--primary-8)] rounded-full text-[var(--primary-12)] hover:text-[var(--primary-10)] hover:border-[var(--primary-10)] font-bold transition-all ease-in duration-300 hover:shadow-md hover:rounded-2xl">
                <Link href={"/host-hackathon/step1"}>
                  Host
                </Link>
              </span>
            </>
          )}
          <button
            className="cursor-pointer relative px-4 py-2 bg-transparent text-[var(--primary-12)] font-bold transition-colors"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            <span className="relative flex items-center justify-center w-7 h-7">
              <SunIcon
                className={`absolute transition-all duration-300 scale-110 ${mode === "dark"
                  ? "opacity-100 rotate-0"
                  : "opacity-0 -rotate-45 scale-75"
                  } text-[var(--primary-12)] drop-shadow-[0_0_8px_rgba(255,221,51,0.3)]`}
              />
              <MoonIcon
                className={`absolute transition-all duration-300 scale-110 ${mode === "light"
                  ? "opacity-100 rotate-0"
                  : "opacity-0 rotate-45 scale-75"
                  } text-[var(--primary-12)]`}
              />
            </span>
          </button>
          {isLoggedIn ? (
            <>
              <div>
                <UserProfileAvatar user={user} />
              </div>
            </>
          ) : (
            <div>
              <Link href="/sign-in">
                <button className="px-4 py-2 text-[var(--primary-12)] hover:text-[var(--primary-10)] font-bold transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="px-6 py-2.5 bg-[var(--primary-6)] hover:bg-[var(--primary-10)] text-[var(--primary-12)] rounded-full hover:shadow-lg hover:shadow-primary/20 font-medium transition-all hover:scale-105 active:scale-100">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

// Skeleton Loading Component
const NavbarSkeleton = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2 border-[var(--primary-6)] bg-[var(--primary-1)] backdrop-blur-md">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo Skeleton */}
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
        </div>

        {/* Navigation Links Skeleton */}
        <div className="flex gap-3">
          <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="h-8 w-18 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>

        {/* Right Side Actions Skeleton */}
        <div className="flex gap-3 items-center">
          {/* Theme Toggle Skeleton */}
          <div className="w-7 h-7 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>

          {/* Auth Buttons Skeleton - Show both to maintain consistent layout */}
          <div className="flex gap-2">
            <div className="h-8 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            <div className="h-9 w-20 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
