import Link from "next/link";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStravaStats } from "@/actions/strava";
import { siteConfig } from "@/config/site";

export async function CardStrava() {
  const data: any = await getStravaStats();

  return (
    <Link href={siteConfig.links.strava} target="_blank" rel="noreferrer">
      <Card className="flex-1 basis-1/3">
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">Run with me!</CardTitle>
          <CardDescription>
            Connect with me on Strava and let&apos;s run together.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalDistance || 0}</div>
          <p className="text-xs text-muted-foreground">
            {data?.totalTime || 0}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
