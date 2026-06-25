export type DemoProfile = {
  email: string;
  password: string;
  company_name: string;
  contact_name: string;
  role: "member" | "admin";
  program_genres: string[];
  needed_roles: string[];
};

const profiles = new Map<string, DemoProfile>();

export function getDemoProfile(email: string): DemoProfile | undefined {
  return profiles.get(email.toLowerCase());
}

export function setDemoProfile(email: string, data: DemoProfile): void {
  profiles.set(email.toLowerCase(), data);
}
