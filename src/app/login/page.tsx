import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-telecareer-surface">
      <Header />
      <main className="mx-auto max-w-md px-4 py-14 flex-1 w-full tc-page-stagger">
        <span className="tc-eyebrow bg-white">LOGIN</span>
        <h1 className="mt-4 text-3xl font-black text-telecareer-ink mb-6">
          <span className="tc-marker">ログイン</span>
        </h1>
        <Suspense fallback={<div className="tc-card p-6 text-sm text-gray-500">読み込み中...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
