import Link from "next/link";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { getDiscordMembers } from "@/actions/discord";
import { siteConfig } from "@/config/site";

export async function CardDiscord() {
  const getDiscordMembers = async function () {
    const res = await fetch(`${process.env.BASE_URL}/api/discord`);
    const data = await res.json();
    return data;
  };

  const data = await getDiscordMembers();

  return (
    <Link href={siteConfig.links.discord} target="_blank" rel="noreferrer">
      <Card className="flex-1 basis-1/3">
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">
            Discord community
          </CardTitle>
          <CardDescription>
            Join my Discord community and connect with other software developers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data?.totalMembers || 1039} members
          </div>
          <p className="text-xs text-muted-foreground">
            {data?.onlineMembers || 56} online now
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
