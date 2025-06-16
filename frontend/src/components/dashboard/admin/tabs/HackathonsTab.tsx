import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { DashboardData } from "@/types/admin_interfaces";
import HackathonsTable from "../tables/HackathonsTable";

interface HackathonsTabProps {
  data: DashboardData;
}

export default function HackathonsTab({ data }: HackathonsTabProps) {
  const { hackathonData, hackathonLoading, hackathonError, refetchHackathons } =
    data;
  console.log("Hackathons Tab");
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Hackathon Management</CardTitle>
          <Button className="bg-[var(--primary-9)] text-white hover:bg-[var(--primary-10)]">
            <Calendar className="h-4 w-4 mr-2" />
            Create Hackathon
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <HackathonsTable
          hackathons={hackathonData?.response || []}
          loading={hackathonLoading}
          error={hackathonError}
          retry={() => refetchHackathons()}
        />
      </CardContent>
    </Card>
  );
}
