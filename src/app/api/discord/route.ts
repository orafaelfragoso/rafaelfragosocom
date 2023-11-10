export async function GET() {
  try {
    const serverId = "875738767841964113";
    const token = process.env.DISCORD_BOT_TOKEN;

    const response = await fetch(
      `https://discord.com/api/v10/guilds/${serverId}?with_counts=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bot ${token}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Couldn't fetch the data" },
        { status: 503 }
      );
    }

    const data = await response.json();

    return Response.json(
      {
        totalMembers: data?.approximate_member_count,
        onlineMembers: data?.approximate_presence_count,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: "Couldn't fetch the data" }, { status: 503 });
  }
}
