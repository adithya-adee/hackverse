import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Lock } from "lucide-react";
import { User } from "@/types/core_interfaces";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  error: unknown;
  retry: () => void;
  minimal?: boolean;
}

export default function UsersTable({
  users,
  loading,
  error,
  retry,
  minimal = false,
}: UsersTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="h-10 w-10 rounded-full border-4 border-t-transparent border-[var(--primary-9)] animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-2">Failed to load users</p>
        <Button variant="outline" onClick={retry} size="sm">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            {!minimal && <TableHead>Skills</TableHead>}
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id} className="hover:bg-[var(--primary-2)]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.profileImageUrl || undefined} />
                      <AvatarFallback className="bg-[var(--primary-5)]">
                        {user.name
                          ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-[var(--muted-foreground)]">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.UserRole &&
                      user.UserRole.map((role, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-[var(--primary-3)] text-[var(--primary-11)] border-[var(--primary-7)]"
                        >
                          {role.Role?.name}
                        </Badge>
                      ))}
                  </div>
                </TableCell>
                {!minimal && (
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.Skill &&
                        user.Skill.slice(0, 2).map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-[var(--primary-2)]"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      {user.Skill && user.Skill.length > 2 && (
                        <Badge variant="outline">
                          +{user.Skill.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                )}
                <TableCell className="text-[var(--muted-foreground)]">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500"
                    >
                      <Lock className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={minimal ? 4 : 5} className="text-center py-8">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
