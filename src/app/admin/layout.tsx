import { redirect } from "next/navigation";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdmin();
  if (!profile) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col bg-telecareer-surface">
      <Header user={{ email: profile.email ?? undefined }} profile={profile} />
      <main className="mx-auto max-w-6xl px-4 py-6 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
