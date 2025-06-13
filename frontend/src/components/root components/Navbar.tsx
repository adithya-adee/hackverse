"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { initTheme, toggleTheme } from "@/store/themeSlice";
import { MoonIcon, SunIcon, Menu, X } from "lucide-react";
import { RootState } from "@/store/store";
import UserProfileAvatar from "./UserProfileAvatar";
import { RoleType } from "@/types/core_enum";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

interface UserState {
  id: string;
  email: string;
  name: string;
  roles: Array<RoleType>;
}

function Navbar() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const user: UserState = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!mounted) {
    return <NavbarSkeleton />;
  }

  const isOrganizer = isLoggedIn && user?.roles?.includes(RoleType.ORGANIZER);

  const navigationItems = [
    { name: "Events", path: "/events" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[var(--primary-1)]/90 backdrop-blur-md border-b border-[var(--primary-5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Logo className="lg:h-48 md:h-32 sm:h-22 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "text-[var(--primary-12)] bg-[var(--primary-3)]"
                    : "text-[var(--primary-11)] hover:text-[var(--primary-12)] hover:bg-[var(--primary-3)]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Host Button (desktop) */}
            {isOrganizer && (
              <Button
                asChild
                className="hidden md:flex bg-[var(--primary-9)] text-[var(--primary-1)] hover:bg-[var(--primary-10)] transition-all"
                size="sm"
              >
                <Link href="/host-hackathon/step1">Host Hackathon</Link>
              </Button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full bg-[var(--primary-3)] text-[var(--primary-11)] hover:text-[var(--primary-12)] hover:bg-[var(--primary-4)] transition-colors"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <motion.div
                  initial={false}
                  animate={{ opacity: mode === "dark" ? 1 : 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <SunIcon className="w-5 h-5" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{ opacity: mode === "light" ? 1 : 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <MoonIcon className="w-5 h-5" />
                </motion.div>
              </div>
            </button>

            {/* Authentication Actions */}
            {isLoggedIn ? (
              <UserProfileAvatar user={user} />
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-[var(--primary-11)] hover:text-[var(--primary-12)] transition-colors"
                >
                  Log in
                </Link>
                <Button
                  asChild
                  size="sm"
                  className="bg-[var(--primary-9)] text-[var(--primary-1)] hover:bg-[var(--primary-10)] transition-all"
                >
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[var(--primary-11)] hover:text-[var(--primary-12)] hover:bg-[var(--primary-3)] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--primary-2)] border-b border-[var(--primary-5)] overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.path
                      ? "text-[var(--primary-12)] bg-[var(--primary-4)]"
                      : "text-[var(--primary-11)] hover:text-[var(--primary-12)] hover:bg-[var(--primary-3)]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {isOrganizer && (
                <Link
                  href="/host-hackathon/step1"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[var(--primary-1)] bg-[var(--primary-9)] hover:bg-[var(--primary-10)] transition-colors"
                >
                  Host Hackathon
                </Link>
              )}
              {!isLoggedIn && (
                <div className="pt-2 pb-1 border-t border-[var(--primary-5)]">
                  <Link
                    href="/sign-in"
                    className="block px-3 py-2 rounded-md text-base font-medium text-[var(--primary-11)] hover:text-[var(--primary-12)] hover:bg-[var(--primary-3)] transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block px-3 py-2 mt-1 rounded-md text-base font-medium text-[var(--primary-1)] bg-[var(--primary-9)] hover:bg-[var(--primary-10)] transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;

// Skeleton Loading Component
const NavbarSkeleton = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[var(--primary-5)] bg-[var(--primary-1)]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Skeleton */}
          <div className="h-8 w-36 bg-[var(--primary-4)] rounded animate-pulse"></div>

          {/* Navigation Links Skeleton */}
          <div className="hidden md:flex space-x-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-20 bg-[var(--primary-4)] rounded animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>

          {/* Right Side Actions Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-[var(--primary-4)] rounded-full animate-pulse"></div>
            <div className="h-9 w-9 bg-[var(--primary-4)] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
