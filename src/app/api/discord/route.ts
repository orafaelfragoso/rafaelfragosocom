export async function GET() {
  const serverId = "875738767841964113";
  const token = process.env.DISCORD_BOT_TOKEN;

  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${serverId}?with_counts=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bot ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch server data");
    }

    const serverData = await response.json();
    const data = {
      totalMembers: serverData.approximate_member_count,
      onlineMembers: serverData.approximate_presence_count,
    };

    return Response.json(data, {
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
