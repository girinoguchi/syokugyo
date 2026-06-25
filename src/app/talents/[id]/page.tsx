import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function TalentDetailRedirectPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/mypage");
  }
  redirect("/jobs");
}
