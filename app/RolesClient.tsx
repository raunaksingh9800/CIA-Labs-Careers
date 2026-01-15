"use client";

import { useMemo, useState } from "react";
import { useFilter } from "@/app/context/FilterContext";
import { AnimatePresence, motion } from "framer-motion";
import Filter from "@/components/higherLevel/filter";

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

export default function RolesClient({
  initialRoles,
}: {
  initialRoles: Role[];
}) {
  const [roles] = useState<Role[]>(initialRoles);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const { query, year, branch, type, setQuery } = useFilter();

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      if (query && !role.title.toLowerCase().includes(query.toLowerCase()))
        return false;

      if (year && role.years.length && !role.years.includes(year)) return false;

      if (branch && !role.branches.includes(branch.toUpperCase())) return false;

      if (type && role.type.toLowerCase() !== type) return false;

      return true;
    });
  }, [roles, query, year, branch, type]);

  if (filteredRoles.length === 0) {
    return (
      <>
        <Filter
          showMobile={showMobileFilter}
          onCloseMobile={() => setShowMobileFilter(false)}
        />
        <div className="p-6 w-screen lg:w-[60vw] h-full flex flex-col justify-center items-center">
          <div className="w-fit text-center">
            <i className="hn hn-exclamation-triangle text-7xl text-amber-300"></i>
            <h1 className="mt-4 text-xl font-medium">
              No matching roles found
            </h1>

            <p className="mt-2 w-fit text-sm h-full opacity-60 lg:px-32">
              We couldn't find any roles that match your current criteria.
              Modify your filters or reset them to explore all available roles.
            </p>
            <button onClick={() => {window.location.reload()}} className="text-sm underline hover:cursor-pointer mt-4 opacity-80">
              Clear All
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Filter
        showMobile={showMobileFilter}
        onCloseMobile={() => setShowMobileFilter(false)}
      />

      <main className="flex-1 overflow-y-scroll">
        <div className="flex flex-col lg:hidden px-6 mt-4 pb-6 border-b border-[#1C1C1C]">
          <h1 className="text-xl font-medium">Role Search</h1>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-dotted mt-4 w-full outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-2 px-3 bg-transparent"
            placeholder="What role do you prefer"
          />
          <div className="flex flex-row items-end w-full mt-4 justify-end">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="text-xs underline hover:cursor-pointer opacity-60 text-end w-fit relative"
            >
              Filter Options
            </button>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredRoles.map((role) => (
            <motion.div
              key={role.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="lg:w-[60vw] px-6 py-6 border-b border-[#1C1C1C] overflow-hidden"
            >
              <h1 className="text-2xl font-medium">{role.title}</h1>

              <div className="flex flex-row mt-4 opacity-60 gap-6 flex-wrap">
                <div className="flex flex-row items-center gap-2 font-medium">
                  <i className="hn hn-calender text-lg"></i>
                  {role.years.length === 0
                    ? "Any Year"
                    : `${role.years.join(", ")} Year`}
                </div>

                <div className="flex flex-row items-center gap-1">
                  <i className="hn hn-receipt text-lg"></i>
                  {role.branches.join(", ")}
                </div>

                <div className="flex flex-row items-center gap-1">
                  <i className="hn hn-code text-lg"></i>
                  {role.type.replaceAll("_", " ")}
                </div>

                <div className="flex flex-row items-center gap-1">
                  <i className="hn hn-clock text-lg"></i>
                  {role.commitment}
                </div>
              </div>

              <div className="mt-4 opacity-50 line-clamp-3">
                {role.description}
              </div>

              <a
                href={`/roles?slug=${role.slug}`}
                className="inline-block mt-6 font-medium border border-white/30 text-white/60 focus:bg-[#6EFF63] focus:text-black active:bg-[#6EFF63] active:text-black transition-all hover:bg-[#6EFF63] px-4 py-1 hover:text-black"
                onTouchStart={(e) => e.currentTarget.focus()}
              >
                Learn More
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>
    </>
  );
}
