import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2 } from "lucide-react";
import { RoleRequest } from "@/types/core_interfaces";

interface RoleRequestCardProps {
  request: RoleRequest; // Changed from 'data' to 'request' for clarity
  onApprove: (id: string) => void; // Simplified to accept only an ID
  onReject: (id: string) => void; // Simplified to accept only an ID
}

// Make this the default export
export default function RoleRequestCard({
  request, // No longer need to rename
  onApprove,
  onReject,
}: RoleRequestCardProps) {
  if (!request) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg bg-[var(--primary-2)] border border-[var(--primary-6)] flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">
            {request.User?.name || "Unknown User"}
          </div>
          <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
            <Badge variant="secondary" className="bg-[var(--primary-5)]">
              {request.Role?.name || "Unknown Role"}
            </Badge>
            <span>·</span>
            <span>{new Date(request.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-2 line-clamp-2">
            {request.reason}
          </p>
          {request.supportingUrl && (
            <a
              href={request.supportingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--primary-9)] hover:underline mt-1 block"
            >
              View supporting material
            </a>
          )}
        </div>
        <Badge
          className={
            request.status === "PENDING"
              ? "bg-amber-100 text-amber-800 border-amber-300"
              : request.status === "APPROVED"
                ? "bg-green-100 text-green-800 border-green-300"
                : "bg-red-100 text-red-800 border-red-300"
          }
        >
          {request.status}
        </Badge>
      </div>
      {request.status === "PENDING" && (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)] flex-1"
            onClick={() => onApprove(request.id)} // Pass the ID directly
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onReject(request.id)} // Pass the ID directly
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );
}

// NOTE: Move the StatsCard component to its own file
