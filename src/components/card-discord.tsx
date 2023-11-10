"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { useApi } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";

type ApiResponse = {
  totalMembers: number;
  onlineMembers: number;
};

export function CardDiscord() {
  const { data, loading } = useApi<ApiResponse>("/api/discord");

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
            {loading ? (
              <Skeleton className="h-4 w-full mb-2" />
            ) : (
              `${data?.totalMembers} members`
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {loading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              `${data?.onlineMembers} online now`
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
