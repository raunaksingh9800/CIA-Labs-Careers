"use client";

import "./globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";
import Nav from "@/components/higherLevel/nav";
import LeftSection from "@/components/higherLevel/leftSection";
import { Inter, Edu_NSW_ACT_Cursive } from "next/font/google";
import { FilterProvider } from "@/app/context/FilterContext";
import { useState } from "react";
import {
  ClerkProvider,

} from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] });
const edu = Edu_NSW_ACT_Cursive({
  subsets: ["latin"],
  fallback: ["cursive", "sans-serif"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
        <ClerkProvider>
    <html lang="en" className={`${inter.className} ${edu.className}`}>
      <body>
        <FilterProvider>
          {/* GLOBAL APP SHELL */}
          <div className="w-screen h-dvh flex flex-col overflow-hidden">
            {/* NAVBAR */}
            <Nav onMenuToggle={() => setShowMobileMenu(true)} />

            {/* MAIN AREA */}
            <div className="flex flex-1 overflow-hidden">
              {/* LEFT ICON SECTION */}
              <LeftSection
                showMobile={showMobileMenu}
                onCloseMobile={() => setShowMobileMenu(false)}
              />
              {children}
            </div>
          </div>
        </FilterProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}