import { getDemoProfile, type DemoProfile } from "./demo-store";
import { parseDemoCookie } from "./demo-auth";

/**
 * デモ環境の管理者APIの簡易認可。
 * Cookie をブロックするブラウザ(iOS Brave等)でも動くよう、
 * クライアントは localStorage のセッション email を `x-demo-email` で送る。
 * Cookie が使える環境では Cookie からも判定する。
 */
export function getDemoAdmin(req: Request): DemoProfile | null {
  const headerEmail = req.headers.get("x-demo-email");
  const cookieSession = parseDemoCookie(req.headers.get("cookie"));
  const email = (headerEmail || cookieSession?.email || "").trim().toLowerCase();
  if (!email) return null;
  const profile = getDemoProfile(email);
  if (!profile || profile.role !== "admin") return null;
  return profile;
}
