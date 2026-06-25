"use client";

import { useRouter } from "next/navigation";
import { REQUEST_STATUSES } from "@/lib/types";

export function RequestStatusForm({ requestId, currentStatus }: { requestId: string; currentStatus: string }) {
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    const res = await fetch(`/api/admin/requests/${requestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) router.refresh();
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="tc-input py-1.5 text-sm"
    >
      {REQUEST_STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
