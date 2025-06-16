import React, { useState } from "react";
import CreateTeamForm from "./CreateTeamForm";
import { UserPlus2 } from "lucide-react";
import TeamMembercard from "./TeamMemberCard";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, User, Mail } from "lucide-react";
import { useLazyIsRegisteredQuery } from "@/apiSlice/userApiSlice";
import { useCreateTeamRequestMutation } from "@/apiSlice/teamApiSlice";
interface Props {
  hackathonId: string;
  teamId: string | undefined;
  setTeamId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function CreateTeamSection({ hackathonId, teamId, setTeamId }: Props) {
  const [memberEmail, setMemberEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [triggerCheck, result] = useLazyIsRegisteredQuery();

  const [createTeamRequest, { isLoading: isRequestCreating }] =
    useCreateTeamRequestMutation();

  //TODO:This input box should be disables if max members are there.
  const submitEmail = async () => {
    setIsSubmitting(true);
    console.log("Email submitted:", memberEmail);
    const res = await triggerCheck({ memberEmail }).unwrap();
    console.log(res);
    console.log(res.isRegistered);
    if (res.isRegistered == false) {
      toast.error("This email address is not registered to our Application");
    } else {
      const userId = res.user.id;
      const createdReq = await createTeamRequest({
        userId,
        teamId,
        isSentByTeam: true,
      });
      toast.success(`Team joining request is sent to ${res.user.name}`);
    }
    setIsSubmitting(false);
    setMemberEmail("");
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    submitEmail();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitEmail();
    }
  };

  return (
    <div>
      <div>
        <CreateTeamForm
          hackathonId={hackathonId}
          teamId={teamId}
          setTeamId={setTeamId}
        />
      </div>
      <div className="p-2 my-2 mx-auto">
        {/*V2:
        will directly send a mail to user asking to signup to our app //if it is
        there will create a team-request with teamid and user-id found using
        email */}

        <motion.div
          className="border-2 w-[80%] mx-auto bg-[var(--primary-2)] my-6 rounded-2xl border-dashed border-blue-300/60 p-6 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          whileHover={{
            scale: 1.01,
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          }}
        >
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-xl text-[var(--primary-9)] font-semibold flex items-center">
              <UserPlus2 className="h-5 w-5 mr-2" />
              Add team members
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label
                htmlFor="userEmail"
                className="text-sm font-medium text-gray-700 dark:text-purple-600 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className=" flex gap-4 ">
                <Input
                  id="userEmail"
                  type="email"
                  placeholder="demo@gmail.com"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-[var(--primary-2)] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 hover:border-blue-400"
                  required
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    type="button"
                    onClick={onSubmit}
                    // disabled={isSubmitting || !memberEmail}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <motion.div className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "Sending..." : "Send Invitation"}
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="mt-4 text-xs text-gray-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            We'll send them an invitation to join your team
          </motion.div>
        </motion.div>

        {/* Map all the user from team-req and team-members */}
        <div>
          {teamId ? (
            <TeamMembercard teamId={teamId} />
          ) : (
            <div>No Team Members Found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateTeamSection;
