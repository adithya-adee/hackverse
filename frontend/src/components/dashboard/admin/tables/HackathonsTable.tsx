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
import { Eye, Settings } from "lucide-react";
import { Hackathon } from "@/types/core_interfaces";

interface HackathonsTableProps {
  hackathons: Hackathon[];
  loading: boolean;
  error: unknown;
  retry: () => void;
}

export default function HackathonsTable({
  hackathons,
  loading,
  error,
  retry,
}: HackathonsTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-[var(--primary-9)] animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-2">Failed to load hackathons</p>
        <Button variant="outline" onClick={retry}>
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
            <TableHead>Title</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hackathons.length > 0 ? (
            hackathons.map((hackathon) => (
              <TableRow
                key={hackathon.id}
                className="hover:bg-[var(--primary-2)]"
              >
                <TableCell>
                  <div className="font-semibold">{hackathon.title}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-[var(--muted-foreground)]">
                    {new Date(hackathon.startDate).toLocaleDateString()}
                    {" - "}
                    {new Date(hackathon.endDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {hackathon.HackathonTag?.slice(0, 2).map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-[var(--primary-2)]"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                    {hackathon.HackathonTag &&
                      hackathon.HackathonTag.length > 2 && (
                        <Badge variant="outline">
                          +{hackathon.HackathonTag.length - 2}
                        </Badge>
                      )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      hackathon.status === ("ONGOING" as Hackathon["status"])
                        ? "bg-green-100 text-green-800 border-green-300"
                        : hackathon.status === "UPCOMING"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : "bg-gray-100 text-gray-800 border-gray-300"
                    }
                  >
                    {hackathon.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No hackathons found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
