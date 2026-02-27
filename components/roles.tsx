"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RolesSidebar from "./RolesPage/RolesSidebar";
import RoleContent from "./RolesPage/RoleContent";

export default function RolesPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data.roles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch roles:", err);
        setLoading(false);
      });
  }, []);

  // Find the currently selected role from the single fetched array
  const selectedRole = roles.find((r) => r.slug === slug) || null;

  return (
    <div className="flex w-full h-full">
      <RolesSidebar roles={roles} loading={loading} currentSlug={slug} />
      <RoleContent role={selectedRole} loading={loading} currentSlug={slug} />
    </div>
  );
}