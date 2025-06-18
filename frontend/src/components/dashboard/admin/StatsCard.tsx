import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { itemVariants } from "@/types/admin_interfaces";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.FC<{ className?: string }>;
  index: number;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  index,
}: StatsCardProps) {
  return (
    <motion.div variants={itemVariants} custom={index}>
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-md font-medium text-[var(--muted-foreground)]">
              {title}
            </CardTitle>
            <div className="p-1 bg-[var(--primary-4)] rounded-md">
              <Icon className="h-5 w-5 text-[var(--primary-10)]" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-2xl font-bold text-[var(--primary-12)]">
            {value}
          </div>
          <div className="flex items-center mt-1 text-xs">
            <Badge className="bg-[var(--primary-5)] text-[var(--primary-12)]">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {change}
            </Badge>
            <span className="ml-1.5 text-[var(--muted-foreground)]">
              vs previous month
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
