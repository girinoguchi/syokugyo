import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo-auth";
import { Header } from "./Header";
import { DemoHeaderClient } from "./DemoHeaderClient";

export async function AppHeader() {
  // デモモードはCookieをブロックするブラウザ(iOS Brave等)に対応するため
  // クライアント側で localStorage のセッションを読んでヘッダーを表示する。
  if (isDemoMode()) {
    return <DemoHeaderClient />;
  }
  const user = await getCurrentUser();
  const profile = user ? await getCurrentProfile() : null;
  return <Header user={user ?? undefined} profile={profile ?? undefined} />;
}
