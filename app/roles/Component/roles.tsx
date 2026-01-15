"use client";

import Filter from "@/components/higherLevel/filter";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function limitWords(text: string, limit = 20) {
  if (!text) return "";
  const words = text.split(/\s+/);
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
}
export default function RolesPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [role, setRole] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarRoles, setSidebarRoles] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => {
        if (data?.roles) setSidebarRoles(data.roles);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    fetch(`/api/roles/one?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role))
      .finally(() => setLoading(false));
  }, [slug]);

  // 👉 No slug = show list page or message
  if (!slug) {
    return <div className="p-6">Select a role</div>;
  }

  if (loading) return <div className=""></div>;
  if (!role) return <></>;

  return (
    <>
      {/* Sidebar */}
      <div
        className="w-[30vw] min-h-full bg-[#1C1C1C] flex flex-col overflow-y-auto px-4 py-4 gap-4 transition-all"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {[...sidebarRoles]
          .sort((a, b) => (a.slug === slug ? -1 : b.slug === slug ? 1 : 0))
          .map((r) => (
            <a
              key={r.id}
              href={`/roles?slug=${r.slug}`}
              className={`border ${
                r.slug === slug
                  ? "border-white/20 bg-[#292929]"
                  : "border-white/5"
              }  px-4 py-4 transition-all hover:bg-[#292929]`}
            >
              <h1 className="text-lg font-medium">{r.title}</h1>
              <p className="text-sm mt-3 opacity-60">
                {limitWords(r.description, 20)}
              </p>
            </a>
          ))}
      </div>

      <main className="flex-1 overflow-y-scroll">
        <div className="px-6 pr-8 mt-6">
          <a
            href="/"
            className=" text-xs flex flex-row items-center gap-2 opacity-60 transition-all hover:gap-3"
          >
            <i className="hn hn-arrow-left "></i> Back
          </a>

          <div className="flex flex-row mt-6 items-center justify-between">
            {" "}
            <h1 className="text-4xl font-medium">{role.title}</h1>
            <i className="hn hn-share text-2xl hover:text-[#6EFF63] hover:cursor-pointer transition-all"></i>
          </div>

          <div className="flex flex-col  mt-7 opacity-60 ml-1 ">
            <div className=" flex flex-row gap-10">
              {" "}
              <div className="flex flex-row items-center gap-2 font-medium ">
                <i className="hn hn-calender text-lg"></i>
                {role.years.length === 0
                  ? "Any Year"
                  : role.years.join(", ") + " Year"}
              </div>
              <div className="flex flex-row items-center gap-2  w-fit">
                <i className="hn hn-receipt text-lg"></i>
                {role.branches.join(", ")}
              </div>
              <div className="flex flex-row items-center gap-2">
                <i className="hn hn-code text-lg"></i>
                {role.type.replaceAll("_", " ")}
              </div>
            </div>

            <div className="flex flex-row items-center gap-2 mt-4">
              <i className="hn hn-clock text-lg"></i>
              {role.commitment}
            </div>
          </div>

          <a
            href={`/apply?slug=${role.slug}`}
            className="inline-block mt-10 text-black px-10 text-lg py-2 font-medium transition-all bg-[#6EFF63] border-[#087600] hover:border-b-6 hover:border-r-5"
          >
            Apply Now
          </a>

          <h1 className=" mt-10 text-lg font-semibold">About the role</h1>
          <div className="mt-4 mb-8 opacity-60 markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {role.description}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </>
  );
}
