import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { Header } from "./Header";

export async function AppHeader() {
  const user = await getCurrentUser();
  const profile = user ? await getCurrentProfile() : null;
  return <Header user={user ?? undefined} profile={profile ?? undefined} />;
}
