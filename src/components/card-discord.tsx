import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDiscordMembers } from "@/actions/discord";

export async function CardDiscord() {
  const data: any = await getDiscordMembers();

  return (
    <Card className="flex-1 basis-1/3">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Discord community</CardTitle>
        <CardDescription>
          Join my Discord community and connect with other software developers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data?.totalMembers || 0} members
        </div>
        <p className="text-xs text-muted-foreground">
          {data?.onlineMembers || 0} online now
        </p>
      </CardContent>
    </Card>
  );
}
