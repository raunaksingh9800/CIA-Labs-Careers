"use client";

import { useState } from "react";
import Nav from "@/components/higherLevel/nav";
import LeftSection from "@/components/higherLevel/leftSection";
import { FilterProvider } from "@/app/context/FilterContext";
import Marquee from 'react-fast-marquee';
export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <FilterProvider>
      <div className="w-screen h-dvh flex flex-col overflow-hidden">
        <Nav onMenuToggle={() => setShowMobileMenu(true)} />

        <div className="flex flex-1 overflow-hidden">
          <LeftSection
            showMobile={showMobileMenu}
            onCloseMobile={() => setShowMobileMenu(false)}
          />
          {children}
        </div>
        
      </div>
    </FilterProvider>
  );
}
