"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import Request from "@/assets/data/team_request.json";
import { TeamRequest } from "@/types/core_interfaces";

const team_request: TeamRequest[] = Request;

function RequestTable() {
  return (
    <div>
      {team_request.map((request, index) => (
        <Table>
          <TableRow key={request.userId + request.teamId}>
            <TableCell>{request.team?.name}</TableCell>
            <TableCell>{request.userId}</TableCell>
            <TableCell>{request.team?.hackathonId}</TableCell>
          </TableRow>
        </Table>
      ))}
    </div>
  );
}

function TeamRequestsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--[var(--primary-)]1)] via-[var(--primary-4)] to-[var(--primary-2)] flex flex-col items-center justify-center p-6">
      <RequestTable />
    </div>
  );
}
export default TeamRequestsPage;
