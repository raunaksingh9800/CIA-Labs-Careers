"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import Title_role from "./components/title_role";
import Year_branch_com from "./components/year_branch_com";
import Textareas from "./components/textarea";

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

export default function page() {
  const [role, setRole] = useState<Role>({
    id: "",
    title: "",
    slug: "",
    descA: "",
    descB: "",
    description: "",
    years: [],
    branches: [],
    type: "",

    commitment: "",
  });
  const rightPanelRef = useRef<HTMLDivElement>(null);



  return (
    <div className="h-dvh w-full flex overflow-hidden bg-black text-white">
      {/* Left Info Panel */}
      <div className="hidden lg:block w-[30vw] h-dvh min-h-0 bg-[#1C1C1C] border-r border-[#333]">
        <div className="h-full min-h-0 overflow-y-auto custom-scrollbar">
          <Sidebar role={role} />
        </div>
      </div>

      {/* Right Form Panel */}
      <div
        className="flex-1 h-dvh min-h-0 overflow-y-auto bg-black"
        ref={rightPanelRef}
      >
        <div className="py-4 px-4 lg:px-6 lg:py-8 min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl  pb-12"
          >
            {/* Mobile Header */}

            <div className="flex items-center gap-2 opacity-60 text-xs mb-6">
              <i className="hn hn-arrow-left"></i>
              <Link href={`/`} className="hover:opacity-100 transition-opacity">
                Back to Dashboard
              </Link>
            </div>
            <h2 className="lg:text-2xl font-medium mb-2  opacity-60 lg:opacity-100">
              Create a new Position
            </h2>
            <p className="opacity-60 mb-8">
              Fill out the form below to submit your application.
            </p>

            <Title_role role={role} setRole={setRole} />

            <Year_branch_com role={role} setRole={setRole} />

            <Textareas role={role} setRole={setRole} />

            <div className=" w-full h-1 border-t border-dotted mb-8"></div>
            <p className="opacity-60 mb-8">Additional questions</p>

            <div className="mb-8 ">

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
