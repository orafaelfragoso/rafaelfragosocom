import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStravaStats } from "@/actions/strava";

export async function CardStrava() {
  const data: any = await getStravaStats();

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
