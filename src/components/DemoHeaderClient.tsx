"use client";

import { Header } from "./Header";
import { clearClientSession, useDemoClientSession } from "@/lib/demo-client-session";

export function DemoHeaderClient() {
  const { session } = useDemoClientSession();

  const handleLogout = () => {
    clearClientSession();
    // Cookieも念のためクリア（許可されている環境向け）
    fetch("/api/demo/logout", { method: "POST" }).catch(() => {});
    window.location.assign("/");
  };

  const user = session ? { email: session.email } : undefined;
  const profile = session
    ? {
        company_name: session.company_name,
        contact_name: session.contact_name,
        role: session.role,
      }
    : undefined;

  return <Header user={user} profile={profile} onLogout={session ? handleLogout : undefined} />;
}
