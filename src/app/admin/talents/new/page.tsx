import Link from "next/link";
import { TalentForm } from "../TalentForm";

export default function AdminTalentNewPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm link-accent mb-4 inline-block">← ダッシュボード</Link>
      <span className="tc-eyebrow bg-white">NEW</span>
      <h1 className="mt-3 text-2xl md:text-3xl font-black text-telecareer-ink mb-5 tc-section-heading">
        人材を追加
      </h1>
      <TalentForm actionUrl="/api/admin/talents" method="POST" />
    </div>
  );
}
