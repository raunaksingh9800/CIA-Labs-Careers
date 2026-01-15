"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

function limitWords(text: string, limit = 20) {
  if (!text) return "";
  const words = text.split(/\s+/);
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
}

function SkeletonLoader() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="relative border border-white/5 px-4 py-4 block animate-pulse"
        >
          <div className="flex flex-col gap-1">
            <div className="h-6 bg-white/10 rounded w-3/4"></div>
            <div className="space-y-2 mt-1">
              <div className="h-4 bg-white/10 rounded w-full"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
              <div className="h-4 bg-white/10 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function RolesSidebar() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [sidebarRoles, setSidebarRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setSidebarRoles(data.roles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div
      className="w-[30vw] min-h-full bg-[#1C1C1C] hidden  flex-col overflow-y-auto px-4 py-4 gap-4 lg:flex"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {loading ? (
        <SkeletonLoader />
      ) : (
        <LayoutGroup>
          {sidebarRoles.map((r) => {
            const isActive = r.slug === slug;
            return (
              <Link
                key={r.id}
                href={`/roles?slug=${r.slug}`}
                scroll={false}
                className="relative border w-full border-white/5 px-4 py-4 block"
              >
                {/* Sliding active background */}
                {isActive && (
                  <motion.div
                    layoutId="active-role"
                    className="absolute inset-0 bg-[#292929] border border-white/20"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 40,
                    }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-1">
                  <h1 className="text-lg font-medium text-white">{r.title}</h1>
                  <p className="text-sm opacity-60 text-white leading-relaxed">
                    {limitWords(r.description, 20)}
                  </p>
                </div>
              </Link>
            );
          })}
        </LayoutGroup>
      )}
    </div>
  );
}