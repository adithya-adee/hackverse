import React from "react";
import hackathonData from "@/assets/data/hackathon-listing-json-data.json";
import { HackathonCard } from "@/components/root components/HackathonCard";

function Page() {
  //TODO: fetch this from backend later
  const hackathons = hackathonData;

  return (
    <div className="pt-16 min-h-screen w-full bg-gradient-to-br from-[var(--primary-5)] via-[var(--primary-3)] to-[var(--primary-1)]">
      <div className="w-full">
        {/* search bar */}
        <div className="bg-[var(--primary-2)] h-30 w-full"></div>

        {/* hackathons list */}
        <div className="mt-24 md:mx-38">
          <h1 className="m-4 font-bold text-4xl text-[var(--primary-12)]">
            Upcoming hackathons
          </h1>
          <div className="m-4 max-w-[50%] font-normal text-[var(--primary-11)]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            deleniti pariatur officia asperiores? Voluptatem aperiam obcaecati
            ab quis.
          </div>

          {/* All the hackathons listed */}
          <div className="flex justify-center items-center min-h-screen  ">
            <div className="md:m-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-24">
              {hackathons.map((hackathon) => (
                <HackathonCard
                  key={hackathon.id}
                  id={hackathon.id}
                  title={hackathon.title}
                  description={hackathon.description}
                  bannerImageUrl={hackathon.bannerImageUrl}
                  startDate={hackathon.startDate}
                  mode={hackathon.mode as "OFFLINE" | "ONLINE" | "HYBRID"}
                  maxTeamSize={hackathon.maxTeamSize}
                  tags={hackathon.tags}
                  registeredParticipants={hackathon.registeredParticipants}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
