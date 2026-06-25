import { findDemoUser, loadDemoUsers, upsertDemoUser } from "./demo-store-persist";

export type DemoProfile = {
  email: string;
  password: string;
  company_name: string;
  contact_name: string;
  role: "member" | "admin";
  program_genres: string[];
  needed_roles: string[];
  user_type?: string | null;
  interested_categories?: string[];
  phone?: string | null;
  birthdate?: string | null;
};

export type DemoApplication = {
  id: string;
  created_at: string;
  job_id: string;
  job_title: string;
  applicant_name: string;
  email: string;
  age: string;
  gender: string;
  address: string;
  phone: string;
  message: string;
};

export type DemoInquiry = {
  id: string;
  created_at: string;
  contact_name: string;
  email: string;
  phone: string;
  message: string;
};

export const DEMO_ACCOUNTS = [
  {
    label: "会員",
    email: "member@demo.local",
    password: "demo123",
  },
  {
    label: "管理者（管理画面は本番のみ）",
    email: "admin@demo.local",
    password: "demo123",
  },
] as const;

const applications: DemoApplication[] = [];
const inquiries: DemoInquiry[] = [];

export function getDemoProfile(email: string): DemoProfile | undefined {
  return findDemoUser(email);
}

export function setDemoProfile(email: string, data: DemoProfile): void {
  upsertDemoUser({ ...data, email: email.trim().toLowerCase() });
}

export function listDemoProfiles(): DemoProfile[] {
  return loadDemoUsers();
}

export function addDemoApplication(data: Omit<DemoApplication, "id" | "created_at">): DemoApplication {
  const row: DemoApplication = {
    ...data,
    id: `app-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  applications.push(row);
  return row;
}

export function addDemoInquiry(data: Omit<DemoInquiry, "id" | "created_at">): DemoInquiry {
  const row: DemoInquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  inquiries.push(row);
  return row;
}
