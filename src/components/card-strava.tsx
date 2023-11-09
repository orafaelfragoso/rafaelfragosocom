import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Stats = {
  totalDistance: string;
  totalRuns: number;
  totalTime: string;
};

async function getStrava() {
  const res = await fetch(`${process.env.BASE_URL}/api/strava`);
  return res.json();
}

export async function CardStrava() {
  const data: Stats | null = await getStrava();

  return (
    <Card className="flex-1 basis-1/3">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Run with me!</CardTitle>
        <CardDescription>
          Connect with me on Strava and let&apos;s run together.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.totalDistance}</div>
        <p className="text-xs text-muted-foreground">{data?.totalTime}</p>
      </CardContent>
    </Card>
  );
}
