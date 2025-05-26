import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2 border-primary-7 bg-primary-1`}
    >
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <a className="flex items-center" href="/">
          <img src="/logo.png" alt="logo" className="h-25 w-auto p-2" />
        </a>

        <div className="flex gap-3">
          <Link href="/events">
            <button className="px-4 py-2 text-primary-11 hover:text-primary-10 font-bold transition-colors">
              Events
            </button>
          </Link>
          <Link href="/about-us">
            <button className="px-4 py-2 text-primary-11 hover:text-primary-10 font-bold transition-colors">
              About Us
            </button>
          </Link>
        </div>

        <div className="flex gap-3">
          <Link href="/sign-in">
            <button className="px-4 py-2 text-primary-11 hover:text-primary-10 font-bold transition-colors">
              Login
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="px-6 py-2.5 bg-primary-6 hover:bg-primary-10 text-primary-12 rounded-full hover:shadow-lg hover:shadow-primary/20 font-medium transition-all hover:scale-105 active:scale-100">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
