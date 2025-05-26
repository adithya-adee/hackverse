import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { HistoryIcon, UsersIcon, UserPenIcon } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [
    { href: "/dashboard/profile", icon: UserPenIcon, label: "Profile" },
    {
      href: "/dashboard/team-requests",
      icon: UsersIcon,
      label: "Team Request",
    },
    { href: "/dashboard/history", icon: HistoryIcon, label: "History" },
  ],
};

function UserDock() {
  return (
    <div className="flex flex-col items-center justify-center sticky">
      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-8 text-primary-10" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}

export default UserDock;
