import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isDemoMode, parseDemoCookie } from "@/lib/demo-auth";

export async function POST() {
  const cookieStore = await cookies();
  if (isDemoMode()) {
    cookieStore.delete("demo_session");
    redirect("/");
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
