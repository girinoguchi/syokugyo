import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import { isDemoMode, parseDemoCookie, demoSessionToProfile } from "@/lib/demo-auth";
import { headers } from "next/headers";

export async function getCurrentUser() {
  if (isDemoMode()) {
    const headersList = await headers();
    const cookie = headersList.get("cookie");
    const session = parseDemoCookie(cookie);
    if (!session) return null;
    return { id: session.id, email: session.email } as { id: string; email: string };
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (isDemoMode()) {
    const headersList = await headers();
    const cookie = headersList.get("cookie");
    const session = parseDemoCookie(cookie);
    if (!session) return null;
    return demoSessionToProfile(session);
  }
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data as Profile | null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) return null;
  return user;
}

export async function requireAdmin() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") return null;
  return profile;
}
