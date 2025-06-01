import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { formatDate } from "@/lib/formatters";
import type { Role } from "@/types/core_interfaces";

interface RolesSectionProps {
  roles: Role[];
}

export function RolesSection({ roles }: RolesSectionProps) {
  return (
    <Card className="shadow-lg border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--primary-9)]" />
          Roles
        </CardTitle>
        <CardDescription>Your platform roles and permissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {roles.map((roleData) => (
          <div
            key={roleData?.id}
            className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-lg text-[var(--muted-foreground)]"
          >
            <div>
              <Badge className="mb-1 bg-[var(--accent)] text-[var(--accent-foreground)]">
                {roleData?.name}
              </Badge>
              <p className="text-sm">{roleData.description}</p>
            </div>
            <div className="text-right text-sm">
              <p>Assigned</p>
              <p>{formatDate(roleData.createdAt)}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
