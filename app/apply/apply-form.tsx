"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Role } from "@/types/role";
import { RoleDetails } from "@/components/apply/role-details";
import { ApplicationForm } from "@/components/apply/application-form";

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [role, setRole] = useState<Role | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    if (slug) {
      fetch(`/api/roles/one?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.role) {
            setRole(data.role);
          }
          setLoadingRole(false);
        })
        .catch(() => setLoadingRole(false));
    } else {
      setLoadingRole(false);
    }
  }, [slug]);

  // Loading View
  if (loadingRole) {
    return (
      <div className="h-screen flex w-screen lgw-[30vw]  lg:bg-[#1C1C1C] flex-col  px-6 py-6  text-white">
        <div className="h-5  bg-white/10 rounded w-1/2 mb-4"></div>
        <div className=" flex flex-row gap-4">
          <div className="h-4 animate-pulse bg-white/10 rounded w-11/12"></div>
          <div className="h-4 animate-pulse bg-white/10 rounded w-11/12"></div>
          <div className="h-4 animate-pulse bg-white/10 rounded w-11/12"></div>
          <div className="h-4 animate-pulse bg-white/10 rounded w-11/12"></div>
          <div className="h-4 animate-pulse bg-white/10 rounded w-11/12"></div>
        </div>

        <div className="h-4 animate-pulse bg-white/10 rounded w-10/12 mt-6"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-9/12 mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-11/12 mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-full mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-10/12 mt-3.5"></div>

        <div className="h-4 animate-pulse bg-white/10 rounded w-10/12 mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-9/12 mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-1/3 mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-11/12 mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-10/12 mt-3.5"></div>

        <div className="h-4 bg-white/10 rounded w-9/12 mt-3"></div>
        <div className="h-4 bg-white/10 rounded w-10/12 mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-full mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-4/6 mt-3"></div>
        <div className="h-4 animate-pulse bg-white/10 rounded w-10/12 mt-3.5"></div>

        <div className="h-4 bg-white/10 rounded w-10/12 mt-3"></div>
        <div className="h-4 bg-white/10 rounded w-9/10 mt-3"></div>
      </div>
    );
  }

  // Error/Empty View
  if (!slug || !role) {
    return (
      <div className="h-screen flex items-center justify-center p-6 bg-black text-white">
        <div className="text-center">
          <i className="hn hn-exclamation-triangle text-6xl text-amber-300"></i>
          <h1 className="mt-4 text-xl font-medium">
            {!slug ? "Invalid Application Link" : "Role Not Found"}
          </h1>
          <p className="mt-2 opacity-60">
            {!slug
              ? "Please use a valid application link."
              : "This position may no longer be available."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-black text-white">
      {/* Left Info Panel */}
      <div className="hidden lg:block pb-10 lg:w-[30vw] h-full bg-[#1C1C1C] border-r border-[#333] overflow-y-auto custom-scrollbar">
        <RoleDetails role={role} />
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 h-full overflow-y-auto bg-black">
        <ApplicationForm role={role} />
      </div>
    </div>
  );
}
