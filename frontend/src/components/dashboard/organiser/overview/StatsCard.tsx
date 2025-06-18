import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description: string;
  trend: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
}) => {
  return (
    <Card className="bg-[var(--primary-1)] shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-[var(--muted-foreground)]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {icon}
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-[var(--muted-foreground)]">
            {description}
          </p>
          <Badge
            variant="outline"
            className={
              trend > 0
                ? "bg-[var(--primary-3)] text-[var(--primary-11)]"
                : "bg-[var(--primary-4)] text-[var(--primary-11)]"
            }
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
