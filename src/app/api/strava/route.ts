export async function GET() {
  const formatDistance = (distanceInMeters: number) => {
    const kilometers = (distanceInMeters / 1000).toFixed(2);
    return `${kilometers} km`;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

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
    }).then((res) => res.json());

    const accessToken = tokenResponse.access_token;

    const activitiesResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());

    const runActivities = activitiesResponse["all_run_totals"];

    const formattedActivities = {
      totalRuns: runActivities.count,
      totalDistance: formatDistance(runActivities.distance),
      totalTime: formatTime(runActivities.elapsed_time),
    };

    return Response.json(formattedActivities, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600",
        "CDN-Cache-Control": "public, s-maxage=3600",
        "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 503 });
  }
}
