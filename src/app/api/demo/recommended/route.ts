import { NextResponse } from "next/server";
import { getRecommendedJobs } from "@/lib/wordpress/jobs";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const catsRaw = url.searchParams.get("cats") ?? "";
  const categories = catsRaw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const jobs = await getRecommendedJobs(categories, 6);
  return NextResponse.json({ jobs }, { headers: { "Cache-Control": "no-store" } });
}
