import { execSync } from "child_process";

export const dynamic = "force-dynamic";

export async function GET() {
  let commit = "unknown";
  try {
    commit = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    // git unavailable in some deploy environments
  }

  return Response.json(
    {
      commit,
      version: "2026-06-25",
      features: {
        homepage: "logo-marquee + by テレキャリア",
        mypage: true,
        terms: true,
        jobApply: true,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
