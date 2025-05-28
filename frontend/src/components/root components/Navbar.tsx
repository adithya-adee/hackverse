"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { MoonIcon, SunIcon } from "lucide-react";
import { RootState } from "@/store/store";
import { getLoggedInUser, isUserLoggedIn } from "@/utils/auth";
import UserProfileAvatar from "./UserProfileAvatar";

function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const user = getLoggedInUser();
  const isLoggedIn = isUserLoggedIn();

  return (
    <div
      //TODO: make navbar blur a bit
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2 border-[var(--primary-6)] bg-[var(--primary-1)] backdrop-blur-md`}
    >
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <a className="flex items-center justify-center" href="/">
          <Logo className="h-48 w-48" />
        </a>

        <div className="flex gap-3">
          <Link href="/events">
            <button className="px-4 py-2 text-[var(--primary-12)] hover:text-[var(--primary-10] font-bold transition-colors">
              Events
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-4 py-2 text-[var(--primary-12)] hover:text-[var(--primary-10] font-bold transition-colors">
              Dashboard
            </button>
          </Link>
          <Link href="/about-us">
            <button className="px-4 py-2 text-[var(--primary-12)] hover:text-[var(--primary-10] font-bold transition-colors">
              About Us
            </button>
          </Link>
        </div>

        <div className="flex gap-3">
          <button
            className="relative px-4 py-2 bg-transparent text-[var(--primary-12)] font-bold transition-colors"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            <span className="relative flex items-center justify-center w-7 h-7">
              <SunIcon
                className={`absolute transition-all duration-300 scale-110 ${
                  mode === "dark"
                    ? "opacity-100 rotate-0"
                    : "opacity-0 -rotate-45 scale-75"
                } text-[var(--primary-12)] drop-shadow-[0_0_8px_rgba(255,221,51,0.3)]`}
              />
              <MoonIcon
                className={`absolute transition-all duration-300 scale-110 ${
                  mode === "light"
                    ? "opacity-100 rotate-0"
                    : "opacity-0 rotate-45 scale-75"
                } text-[var(--primary-12)]`}
              />
            </span>
          </button>
          {isLoggedIn ? (
            <div>
              {/* todo: complete this component */}
              <UserProfileAvatar />
            </div>
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
