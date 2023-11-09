import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Stats = {
  totalMembers: number;
  onlineMembers: number;
};

async function getDiscord() {
  const res = await fetch(`${process.env.BASE_URL}/api/discord`);
  return res.json();
}

export async function CardDiscord() {
  const data: Stats | null = await getDiscord();

  return (
    <Card className="flex-1 basis-1/3">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Discord community</CardTitle>
        <CardDescription>
          Join my Discord community and connect with other software developers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.totalMembers} members</div>
        <p className="text-xs text-muted-foreground">
          {data?.onlineMembers} online now
        </p>
      </CardContent>
    </Card>
  );
}
