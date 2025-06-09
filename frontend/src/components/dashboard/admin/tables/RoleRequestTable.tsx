import { useState } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Trash2, Eye, MessageSquare, Save } from "lucide-react";
import { RoleRequest } from "@/types/core_interfaces";
import {
  useAcceptRoleRequestMutation,
  useRejectRoleRequestMutation,
  useUpdateRoleRequestNotesMutation,
} from "@/apiSlice/roleRequestApiSlice";
import { toast } from "sonner";

interface RoleRequestsTableProps {
  requests: RoleRequest[];
  loading: boolean;
  error: unknown;
  retry: () => void;
}

export default function RoleRequestsTable({
  requests,
  loading,
  error,
  retry,
}: RoleRequestsTableProps) {
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: string }>(
    {}
  );
  const [isEditingNotes, setIsEditingNotes] = useState<{
    [key: string]: boolean;
  }>({});

  const [acceptRequest] = useAcceptRoleRequestMutation();
  const [rejectRequest] = useRejectRoleRequestMutation();
  const [updateNotes] = useUpdateRoleRequestNotesMutation();

  const handleAccept = async (id: string) => {
    try {
      await acceptRequest(id).unwrap();
      toast.success("Role request accepted");
    } catch (error) {
      toast.error("Failed to accept role request");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectRequest(id).unwrap();
      toast.success("Role request rejected");
    } catch (error) {
      toast.error("Failed to reject role request");
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      await updateNotes({ id, notes: editingNotes[id] }).unwrap();
      setIsEditingNotes({ ...isEditingNotes, [id]: false });
      toast.success("Notes updated");
    } catch (error) {
      toast.error("Failed to update notes");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-[var(--primary-9)] animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 rounded-lg bg-red-50 border border-red-200 text-red-800 text-center max-w-md mx-auto">
        <p className="text-lg font-semibold">Failed to load role requests</p>
        <p className="mt-2 mb-4">
          There was an error loading the role requests. Please try again.
        </p>
        <Button
          variant="outline"
          className="border-red-300 text-red-700"
          onClick={retry}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-16">
        <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No role requests</h3>
        <p className="text-gray-500 mt-1 max-w-sm mx-auto">
          When users request role changes, they will appear here for your
          review.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>User</TableHead>
          <TableHead>Requested Role</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id} className="hover:bg-[var(--primary-2)]">
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-[var(--primary-5)]">
                    {(request.User?.name || "?")[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">
                    {request.User?.name || "Unknown"}
                  </div>
                  <div className="text-sm text-[var(--muted-foreground)]">
                    {request.User?.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className="bg-[var(--primary-3)] text-[var(--primary-11)] border-[var(--primary-7)]"
              >
                {request.Role?.name}
              </Badge>
            </TableCell>
            <TableCell>
              <p className="max-w-xs truncate" title={request.reason}>
                {request.reason}
              </p>
            </TableCell>
            <TableCell>
              {isEditingNotes[request.id] ? (
                <div className="space-y-2">
                  <Textarea
                    value={
                      editingNotes[request.id] || request.reviewNotes || ""
                    }
                    onChange={(e) =>
                      setEditingNotes({
                        ...editingNotes,
                        [request.id]: e.target.value,
                      })
                    }
                    placeholder="Add review notes..."
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setIsEditingNotes({
                          ...isEditingNotes,
                          [request.id]: false,
                        })
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSaveNotes(request.id)}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save Notes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {request.reviewNotes || "No review notes"}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditingNotes({
                        ...isEditingNotes,
                        [request.id]: true,
                      });
                      setEditingNotes({
                        ...editingNotes,
                        [request.id]: request.reviewNotes || "",
                      });
                    }}
                  >
                    Edit Notes
                  </Button>
                </div>
              )}
            </TableCell>
            <TableCell className="text-[var(--muted-foreground)]">
              {new Date(request.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell className="text-right">
              {request.status === "PENDING" ? (
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]"
                    onClick={() => handleAccept(request.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700"
                    onClick={() => handleReject(request.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View details
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
