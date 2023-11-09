import NodeCache from "node-cache";

const formatDistance = (distanceInMeters: number) => {
  const kilometers = (distanceInMeters / 1000).toFixed(2);
  return `${kilometers} km`;
};

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const cache = new NodeCache();

export async function GET() {
  const athleteId = "36752953";
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  try {
    const cachedResponse = cache.get("strava");

    if (cachedResponse) {
      return Response.json(cachedResponse);
    }

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
      throw new Error("Failed to obtain access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!activitiesResponse.ok) {
      throw new Error("Failed to fetch Strava activities");
    }

    const activitiesData = await activitiesResponse.json();
    const runActivities = activitiesData["all_run_totals"];

    const formattedActivities = {
      totalRuns: runActivities.count,
      totalDistance: formatDistance(runActivities.distance),
      totalTime: formatTime(runActivities.elapsed_time),
    };

    cache.set("strava", formattedActivities, 60 * 60);

    return Response.json(formattedActivities);
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}
