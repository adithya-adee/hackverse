import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, PlusIcon } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category?: string;
}

interface SkillSectionProps {
  skills: Skill[];
}

export const SkillsSection = ({
  skills,
}: {
  skills: { id: string; name: string }[];
}) => (
  <Card className="shadow-lg border-border bg-card text-card-foreground">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Target className="w-5 h-5 text-[var(--primary-9)]" />
        Skills
      </CardTitle>
      <CardDescription>Your technical skills and expertise</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill.id}
            variant="secondary"
            className="px-3 py-1 bg-[var(--secondary)] text-[var(--secondary-foreground)]"
          >
            {skill.name}
          </Badge>
        ))}
        <Badge
          variant="outline"
          className="hover:bg-gray-300 transition duration-200 ease-in"
        >
          <PlusIcon className="h-3 w-3" />
        </Badge>
      </div>
    </CardContent>
  </Card>
);
