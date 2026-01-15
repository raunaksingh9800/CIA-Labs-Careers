"use client";

import RolesSidebar from "./RolesPage/RolesSidebar";
import RoleContent from "./RolesPage/RoleContent";
import { AnimatePresence } from "framer-motion";
export default function RolesPage() {
  return (
    <div className="flex w-full h-full">
      <RolesSidebar />
   
      <RoleContent />

    </div>
  );
}
