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

const profiles = new Map<string, DemoProfile>();
const applications: DemoApplication[] = [];
const inquiries: DemoInquiry[] = [];

function seedDemoProfiles() {
  for (const account of DEMO_ACCOUNTS) {
    profiles.set(account.email, {
      email: account.email,
      password: account.password,
      company_name: account.label === "会員" ? "デモ株式会社" : "デモ運営",
      contact_name: account.label === "会員" ? "デモ 太郎" : "デモ 管理者",
      role: account.email.startsWith("admin") ? "admin" : "member",
      program_genres: ["バラエティ"],
      needed_roles: ["AD"],
      user_type: "学生",
      interested_categories: ["制作・AD", "エキストラ"],
      phone: "090-1234-5678",
      birthdate: "2000-01-15",
    });
  }
}

seedDemoProfiles();

export function getDemoProfile(email: string): DemoProfile | undefined {
  return profiles.get(email.toLowerCase());
}

export function setDemoProfile(email: string, data: DemoProfile): void {
  profiles.set(email.toLowerCase(), data);
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
