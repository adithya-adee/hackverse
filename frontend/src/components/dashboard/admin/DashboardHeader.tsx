import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import QuickActionsDialog from "./QuickActionsDialog";

interface DashboardHeaderProps {
  refreshDashboard: () => void;
}

export default function DashboardHeader({
  refreshDashboard,
}: DashboardHeaderProps) {
  const handleRefresh = () => {
    refreshDashboard();
    toast.success("Dashboard refreshed", {
      description: "All data has been updated",
    });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-[var(--primary-12)]">
          Admin Dashboard
        </h1>
        <p className="text-[var(--primary-11)]">
          Manage your platform and users
        </p>
      </motion.div>

      <div className="flex gap-2">
        <Button variant="outline" className="gap-1" onClick={handleRefresh}>
          <ArrowUpRight className="h-4 w-4 rotate-45" />
          Refresh
        </Button>
        <QuickActionsDialog />
      </div>
    </div>
  );
}
