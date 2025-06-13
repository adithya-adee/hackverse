import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateSkillsMutation } from "@/apiSlice/userApiSlice";

interface Skill {
  id: string;
  name: string;
  category?: string;
}

interface SkillSectionProps {
  skills: Skill[];
  userId: string; // Pass the user ID for API calls
}

export const SkillsSection = ({ skills, userId }: SkillSectionProps) => {
  const [currentSkills, setCurrentSkills] = useState<Skill[]>(skills);
  const [newSkill, setNewSkill] = useState<string>(""); // For adding new skills
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [updateSkills] = useUpdateSkillsMutation();

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast.error("Skill name cannot be empty");
      return;
    }

    // Optimistically update the UI
    const updatedSkills = [
      ...currentSkills,
      { id: `temp-${Date.now()}`, name: newSkill },
    ];
    setCurrentSkills(updatedSkills);
    setNewSkill("");

    try {
      setIsUpdating(true);
      await updateSkills({
        userId,
        skills: updatedSkills.map((skill) => skill.name),
      }).unwrap();
      toast.success("Skill added successfully");
    } catch (error) {
      console.error("Failed to add skill:", error);
      toast.error("Failed to add skill");
      // Rollback UI changes
      setCurrentSkills(skills);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    // Optimistically update the UI
    const updatedSkills = currentSkills.filter((skill) => skill.id !== skillId);
    setCurrentSkills(updatedSkills);

    try {
      setIsUpdating(true);
      await updateSkills({
        userId,
        skills: updatedSkills.map((skill) => skill.name),
      }).unwrap();
      toast.success("Skill removed successfully");
    } catch (error) {
      console.error("Failed to remove skill:", error);
      toast.error("Failed to remove skill");
      // Rollback UI changes
      setCurrentSkills(skills);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="shadow-lg border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-[var(--primary-9)]" />
          Skills
        </CardTitle>
        <CardDescription>Your technical skills and expertise</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {currentSkills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="px-3 py-1 bg-[var(--secondary)] text-[var(--secondary-foreground)] flex items-center gap-2"
            >
              {skill.name}
              <Trash2
                className="h-4 w-4 cursor-pointer text-red-500"
                onClick={() => handleRemoveSkill(skill.id)}
              />
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
            disabled={isUpdating}
          />
          <Button
            onClick={handleAddSkill}
            disabled={isUpdating || !newSkill.trim()}
            className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-5)] transition duration-200 ease-in"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
