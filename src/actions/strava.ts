"use server";

export async function getStravaStats() {
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
    });

    if (!tokenResponse.ok) {
      console.error("Could not verify credentials");
      return { error: "Could not verify credentials" };
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
      console.error("Could not retrieve activities");
      return { error: "Could not retrieve activities" };
    }

    const activitiesData = await activitiesResponse.json();
    const runActivities = activitiesData?.all_run_totals;

    return {
      totalRuns: runActivities?.count || 0,
      totalDistance: formatDistance(runActivities?.distance || 0),
      totalTime: formatTime(runActivities?.elapsed_time || 0),
    };
  } catch (error: any) {
    console.error(error);
    return { error: error?.message || "Something wrong" };
  }
}
