export function formatDeadline(deadline: string | null): string | null {
  if (!deadline) return null;
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return deadline;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

export function categoryClass(category: string): string {
  const map: Record<string, string> = {
    エキストラ: "tag-yellow",
    音響スタッフ: "tag-green",
    照明スタッフ: "tag-orange",
    "撮影・カメラ": "tag-coral",
    "制作・AD": "tag-green",
    イベント運営: "tag-yellow",
  };
  return map[category] ?? "tag-plain";
}

export function jobTypeClass(jobType: string): string {
  const map: Record<string, string> = {
    単発: "bg-telecareer-yellow text-ink",
    中長期案件: "bg-telecareer-orange text-white",
    社員募集: "bg-telecareer-green text-ink",
  };
  return map[jobType] ?? "bg-gray-200 text-ink";
}
