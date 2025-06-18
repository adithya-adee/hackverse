"use client";

import React, { useEffect } from "react";
import { HackathonCard } from "@/components/root components/HackathonCard";
import { Hackathon, HackathonTag } from "@/types/core_interfaces";
import { toast } from "sonner";
import { Calendar, Plus, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useGetAllEventsQuery } from "@/apiSlice/hackathonApiSlice";
import Loading from "../loading";

interface Event extends Hackathon {
  _count: {
    HackathonRegistration: number;
  };
}

function Page() {
  const {
    data: hackathonsData,
    isLoading: hackathonLoading,
    error: hackathonError,
    refetch: refetchHackathons,
  } = useGetAllEventsQuery(undefined);

  // Access the hackathons array from the response property
  const hackathons: Event[] = hackathonsData;

  // Show toast notification when there's an error
  useEffect(() => {
    if (hackathonError) {
      toast.error("Failed to load hackathons. Please try again later.");
    }
  }, [hackathonError]);

  if (hackathonLoading) {
    return <Loading />;
  }

  // Check if there are no hackathons or if there was an error
  const noHackathons = !hackathons || hackathons.length === 0 || hackathonError;

  return (
    <div className="pt-10 min-h-screen w-full bg-gradient-to-br from-[var(--primary-5)] via-[var(--primary-3)] to-[var(--primary-1)]">
      <div className="w-full">
        {/* search bar */}
        {/* <div className="bg-[var(--primary-2)] h-30 w-full"></div> */}

        {/* hackathons list */}
        <div className="mt-24 md:mx-38">
          <h1 className="m-4 font-bold text-4xl text-[var(--primary-12)]">
            Upcoming hackathons
          </h1>
          <div className="m-4 max-w-[50%] font-normal text-[var(--primary-11)]">
            Discover exciting hackathon events, register for upcoming
            competitions, and showcase your skills with fellow developers around
            the world.
          </div>

          {/* Empty state or hackathons list */}
          {noHackathons ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="bg-[var(--primary-2)] rounded-full p-8 mb-6">
                <Calendar className="w-16 h-16 text-[var(--primary-9)]" />
              </div>
              <h2 className="text-2xl font-semibold text-[var(--primary-11)] mb-3">
                No hackathons available
              </h2>
              <p className="text-[var(--primary-10)] mb-8 text-center max-w-md">
                {hackathonError
                  ? "We're having trouble loading hackathons. Please try again later."
                  : "There are no upcoming hackathons at the moment. Check back soon!"}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => refetchHackathons()}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-4)] hover:bg-[var(--primary-5)] text-[var(--primary-11)] rounded-md transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Refresh
                </button>
                <Link
                  href="/host-hackathon"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                  Host a Hackathon
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <div className="md:m-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-24">
                {hackathons
                  .slice()
                  .reverse()
                  .map((hackathon: Event) => (
                    <HackathonCard
                      key={hackathon.id}
                      id={hackathon.id}
                      title={hackathon.title}
                      description={hackathon.description || ""}
                      bannerImageUrl={hackathon.bannerImageUrl || ""}
                      startDate={hackathon.startDate}
                      mode={hackathon.mode || "ONLINE"}
                      maxTeamSize={hackathon.maxTeamSize}
                      createdById={hackathon.createdById}
                      tags={hackathon.HackathonTag || []}
                      registeredParticipants={
                        hackathon._count?.HackathonRegistration || 0
                      }
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
