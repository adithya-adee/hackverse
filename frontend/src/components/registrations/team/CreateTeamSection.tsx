import React, { useState } from "react";
import CreateTeamForm from "./CreateTeamForm";
import { UserPlus2, UsersRoundIcon } from "lucide-react";
import TeamMembercard from "./TeamMemberCard";

interface Props {
  hackathonId: string;
}

function CreateTeamSection({ hackathonId }: Props) {
  const [teamId, setTeamId] = useState<string | undefined>("null");

  return (
    <div>
      <div>
        <CreateTeamForm hackathonId={hackathonId} setTeamId={setTeamId} />
      </div>
      <div className="p-2 my-2 mx-auto">
        <div className="text-xl text-[var(--primary-9)] font-semibold flex items-center">
          <UserPlus2 className="h-5 w-5 mr-2" />
          Add team members
        </div>

        {/* comp which opens up the model to search participant */}
        {/*will ask email of the user to be added // first will check wheather
        email is there in db or not if not will notify user there only //V2:will
        directly send a mail to user asking to signup to our app //if it is
        there will create a team-request with teamid and user-id found using
        email */}
        <div className="border-2 w-[80%] mx-auto bg-[var(--primary-2)] my-6 rounded-2xl border-dashed h-20">
          <form>
            <label htmlFor="userEmail">Entre Email</label>
            <input id="userEmail" type="text" placeholder="demo@gmail.com" />
          </form>
        </div>

        {/* Map all the user from team-req and team-members */}
        <div>
          {teamId ? <TeamMembercard teamId={teamId} /> : (<div>No Team Members Found</div>)}
        </div>
      </div>
    </div>
  );
}

export default CreateTeamSection;
