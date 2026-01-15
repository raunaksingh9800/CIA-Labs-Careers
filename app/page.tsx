import RolesClient from "./RolesClient";

type Role = {
  id: string;
  title: string;
  slug: string;
  description: string;
  years: number[];
  branches: string[];
  type: string;
  commitment: string;
};

async function getRoles(): Promise<Role[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window === "undefined"
      ? "http://localhost:3000"
      : window.location.origin);

  const res = await fetch(`${baseUrl}/api/roles`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.roles;
}

export const metadata = {
  title: "Careers at CIA Labs",
  description:
    "Explore open roles at CIA Labs across tech, media, and operations.",
};

export default async function Home() {
  const roles = await getRoles();

  // 🔥 Server-rendered HTML (SEO)
  return <RolesClient initialRoles={roles} />;
}
