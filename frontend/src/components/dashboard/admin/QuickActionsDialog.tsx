import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  UserPlus,
  Calendar,
  MessageSquare,
  Lock,
} from "lucide-react";

export default function QuickActionsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]">
          <Sparkles className="h-4 w-4 mr-2" />
          Quick Actions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Actions</DialogTitle>
          <DialogDescription>
            Perform common admin tasks quickly
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2"
          >
            <UserPlus className="h-6 w-6" />
            Create User
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2"
          >
            <Calendar className="h-6 w-6" />
            New Hackathon
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2"
          >
            <MessageSquare className="h-6 w-6" />
            Send Announcement
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2"
          >
            <Lock className="h-6 w-6" />
            Manage Permissions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
