import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { RoleRequest } from "@/types/core_interfaces";
import {
  useAcceptRoleRequestMutation,
  useRejectRoleRequestMutation,
  useUpdateRoleRequestNotesMutation,
} from "@/apiSlice/roleRequestApiSlice";

interface RoleRequestCardProps {
  request: RoleRequest;
}

export default function RoleRequestCard({ request }: RoleRequestCardProps) {
  const [notes, setNotes] = useState(request.reviewNotes || "");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const [acceptRequest, { isLoading: isAccepting }] =
    useAcceptRoleRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectRoleRequestMutation();
  const [updateNotes, { isLoading: isUpdatingNotes }] =
    useUpdateRoleRequestNotesMutation();

  const handleAccept = async () => {
    try {
      await acceptRequest(request.id).unwrap();
      toast.success("Role request accepted");
    } catch (error) {
      toast.error("Failed to accept role request");
    }
  };

  const handleReject = async () => {
    try {
      await rejectRequest(request.id).unwrap();
      toast.success("Role request rejected");
    } catch (error) {
      toast.error("Failed to reject role request");
    }
  };

  const handleSaveNotes = async () => {
    try {
      await updateNotes({ id: request.id, notes }).unwrap();
      setIsEditingNotes(false);
      toast.success("Notes updated");
    } catch (error) {
      toast.error("Failed to update notes");
    }
  };

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

      {/* Review Notes Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-[var(--muted-foreground)]">
            Review Notes
          </label>
          {!isEditingNotes && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingNotes(true)}
            >
              Edit Notes
            </Button>
          )}
        </div>

        {isEditingNotes ? (
          <div className="space-y-2">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add review notes..."
              className="min-h-[80px]"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingNotes(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveNotes}
                disabled={isUpdatingNotes}
              >
                <Save className="h-4 w-4 mr-1" />
                Save Notes
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">
            {notes || "No review notes added"}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {request.status === "PENDING" && (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)] flex-1"
            onClick={handleAccept}
            disabled={isAccepting}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={handleReject}
            disabled={isRejecting}
          >
            <Trash2 className="h-4 w-4 mr-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
