import NodeCache from "node-cache";

const cache = new NodeCache();

export async function GET() {
  const serverId = "875738767841964113";
  const token = process.env.DISCORD_BOT_TOKEN;

  try {
    const cachedResponse = cache.get("discord");

    if (cachedResponse) {
      return Response.json(cachedResponse);
    }

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

    cache.set("discord", data, 60 * 60);

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}
