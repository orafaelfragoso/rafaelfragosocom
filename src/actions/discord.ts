"use server";

export async function getDiscordMembers() {
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
      }
    ).then((res) => res.json());

    return {
      totalMembers: response.approximate_member_count,
      onlineMembers: response.approximate_presence_count,
    };
  } catch (err: any) {
    console.error(err);
  }
}
