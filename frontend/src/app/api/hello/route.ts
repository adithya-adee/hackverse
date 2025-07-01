import { NextResponse } from "next/server";

const DEFAULT_API_URL = "https://hackverse-skj2.onrender.com";
const HEALTH_CHECK_ENDPOINT = "/users/check/alive";

interface HealthCheckResponse {
  health: string;
  timestamp: string;
}

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

    console.log(apiUrl);
    const res = await fetch(`${apiUrl}${HEALTH_CHECK_ENDPOINT}`, {
      headers: {
        Accept: "text/plain",
      },
      cache: "no-store", // Ensures fresh response
    });

    if (!res.ok) {
      console.log(res);
      throw new Error(`Health check failed with status: ${res.status}`);
    }

    const alive = await res.text();

    const response: HealthCheckResponse = {
      health: alive,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "Health check error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json({ error: "Health check failed" }, { status: 500 });
  }
}
