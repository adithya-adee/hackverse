import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = headers();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Run all maintenance tasks in parallel
    const [statusResponse, expiredResponse] = await Promise.all([
      // Update hackathon statuses
      fetch(`${apiUrl}/hackathons/update/status`),

      // Delete expired requests
      fetch(`${apiUrl}/team/update/expired`, {
        method: "DELETE",
      }),
    ]); 

    if (!statusResponse.ok || !expiredResponse.ok) {
      throw new Error("One or more maintenance tasks failed");
    }

    const statusData = await statusResponse.json();
    const expiredData = await expiredResponse.json();
    return NextResponse.json({
      hackathonStatusUpdates: statusData,
      expiredRequestsDeleted: expiredData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error running maintenance tasks:", error);
    return NextResponse.json(
      { error: "Failed to run maintenance tasks" },
      { status: 500 }
    );
  }
}
