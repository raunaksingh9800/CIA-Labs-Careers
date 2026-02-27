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

type Props = {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
};
function Title_role({ role, setRole }: Props) {
  return (
    <>
      {" "}
      <div className=" mb-8">
        <label className="block text-sm opacity-60 mb-2">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Backend"
          required
          onChange={(e) =>
            setRole((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          className="border-dotted w-full outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-3 px-4 bg-transparent placeholder:opacity-50"
        />
      </div>
      <div className="mb-8">
        <label className="block text-sm opacity-60 mb-2">
          Role Type <span className="text-red-400">*</span>
        </label>
        <select
          name="type"
          required
          onChange={(e) =>
            setRole((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
          className="border-dotted w-full outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-3 px-4 bg-transparent placeholder:opacity-50 cursor-pointer"
        >
          <option value="" className="bg-[#1C1C1C] text-white">
            Select role type
          </option>
          <option value="TECH_CORE" className="bg-[#1C1C1C] text-white">
            Tech Core (Backend, Frontend, DevOps, Systems)
          </option>
          <option value="TECH_AI" className="bg-[#1C1C1C] text-white">
            Tech AI (ML, AI, Data, Research)
          </option>
          <option value="TECH_WEB" className="bg-[#1C1C1C] text-white">
            Tech Web (Next.js, UI-heavy)
          </option>
          <option value="MEDIA_DESIGN" className="bg-[#1C1C1C] text-white">
            Media Design (Graphic, UI/UX, Motion)
          </option>
          <option value="MEDIA_CONTENT" className="bg-[#1C1C1C] text-white">
            Media Content (Writing, Social Media, Copy)
          </option>
          <option value="MEDIA_VIDEO" className="bg-[#1C1C1C] text-white">
            Media Video (Video editing, Reels, YouTube)
          </option>
          <option value="OPERATIONS" className="bg-[#1C1C1C] text-white">
            Operations (Ops, logistics, execution)
          </option>
          <option value="MANAGEMENT" className="bg-[#1C1C1C] text-white">
            Management (Leads, coordinators, PM-like)
          </option>
          <option value="NON_TECH_GENERAL" className="bg-[#1C1C1C] text-white">
            Non-Tech General (Outreach, HR, community)
          </option>
        </select>
      </div>
    </>
  );
}

export default Title_role;
