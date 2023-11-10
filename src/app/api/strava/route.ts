import { formatDistance, formatTime } from "@/lib/utils";

export async function GET() {
  const athleteId = "36752953";
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  try {
    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenResponse.ok) {
      return Response.json(
        { error: "Couldn't retrieve token" },
        { status: 503 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 3600 * 24 },
      }
    );

    if (!activitiesResponse.ok) {
      return Response.json(
        { error: "Couldn't fetch activities" },
        { status: 503 }
      );
    }

    const activitiesData = await activitiesResponse.json();
    const runActivities = activitiesData?.all_run_totals;

    return Response.json(
      {
        totalRuns: runActivities?.count || 0,
        totalDistance: formatDistance(runActivities?.distance || 0),
        totalTime: formatTime(runActivities?.elapsed_time || 0),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: "Couldn't fetch the data" }, { status: 503 });
  }
}
