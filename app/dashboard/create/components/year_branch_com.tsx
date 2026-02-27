import React from "react";
type Role = {
  id: string;
  title: string;
  slug: string;
  description: string;
  years: number[];
  branches: string[];
  type: string;
  descA: string;
  descB: string;
  commitment: string;
};
const BRANCHES = [
  { value: "any", label: "Any" },
  { value: "cse", label: "Computer Science" },
  { value: "ise", label: "Information Science" },
  { value: "aiml", label: "AI / ML" },
  { value: "ece", label: "Electronics" },
  { value: "mech", label: "Mechanical" },
  { value: "civil", label: "Civil" },
  { value: "ee", label: "Electrical" },
];
type Props = {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
};
function Year_branch_com({ role, setRole }: Props) {
  return (
    <>
      <div className=" mb-8">
        <label className="block text-sm font-medium opacity-60 mb-3">
          Year <span className="text-red-400">*</span>
        </label>

        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4].map((year) => {
            const selected = role.years.includes(year);

            return (
              <label
                key={year}
                className={`
            cursor-pointer select-none  border px-5 py-2 text-sm transition-all
            ${
              selected
                ? "border-white bg-white text-black opacity-100"
                : "border-white/40 text-white/70 hover:border-white hover:text-white"
            }
          `}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selected}
                  onChange={(e) => {
                    setRole((prev) => ({
                      ...prev,
                      years: e.target.checked
                        ? [...prev.years, year]
                        : prev.years.filter((y) => y !== year),
                    }));
                  }}
                />
                {year}
                {year === 1 && "st"}
                {year === 2 && "nd"}
                {year === 3 && "rd"}
                {year === 4 && "th"} Year
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium opacity-60 mb-3">
          Branches <span className="text-red-400">*</span>
        </label>

        <div className="flex flex-wrap gap-3">
          {BRANCHES.map(({ value, label }) => {
            const selected = role.branches.includes(value);

            return (
              <label
                key={value}
                className={`
            cursor-pointer select-none  border px-5 py-2 text-sm transition-all
            ${
              selected
                ? "border-white bg-white text-black opacity-100"
                : "border-white/40 text-white/70 hover:border-white hover:text-white"
            }
          `}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selected}
                  onChange={(e) => {
                    setRole((prev) => {
                      // RULE: "any" is mutually exclusive
                      if (value === "any") {
                        return {
                          ...prev,
                          branches: e.target.checked ? ["any"] : [],
                        };
                      }

                      // If selecting a specific branch, remove "any"
                      const filtered = prev.branches.filter((b) => b !== "any");

                      return {
                        ...prev,
                        branches: e.target.checked
                          ? [...filtered, value]
                          : filtered.filter((b) => b !== value),
                      };
                    });
                  }}
                />
                {label}
              </label>
            );
          })}
        </div>
      </div>

      <div className=" mb-8">
        <label className="block text-sm opacity-60 mb-2">
          Commitment <span className="text-red-400">*</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="6 hrs/week for 6 months"
          required
          onChange={(e) =>
            setRole((prev) => ({
              ...prev,
              commitment: e.target.value,
            }))
          }
          className="border-dotted w-full outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-3 px-4 bg-transparent placeholder:opacity-50"
        />
      </div>
    </>
  );
}

export default Year_branch_com;
