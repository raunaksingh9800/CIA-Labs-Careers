"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LeftSectionProps {
  showMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function LeftSection({
  showMobile = false,
  onCloseMobile,
}: LeftSectionProps) {
  const menuItems = [
    { icon: "hn-folder-open", label: "Roles", active: true },
    { icon: "hn-home", label: "How we work", active: false },
    { icon: "hn-flag-checkered-solid", label: "How we hire", active: false },
    { icon: "hn-lightbulb", label: "Prepare", active: false },
  ];

  const handleItemClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Desktop Left Section - Always visible on lg screens */}
      <div className="w-[10vw] hidden lg:flex flex-col justify-center items-center gap-10 font-medium border-r border-[#1C1C1C]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-2 hover:cursor-pointer transition-all ${
              item.active ? "" : "opacity-50 hover:opacity-100"
            }`}
          >
            <i className={`hn ${item.icon} text-2xl`}></i>
            <p className="text-xs">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Mobile Left Section Modal */}
      <AnimatePresence>
        {showMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={onCloseMobile}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[75vw] bg-[#0A0A0A] z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="px-6 py-6 border-b border-[#1C1C1C] flex justify-between items-center">
                  <div className="text-xl">
                    CIA <strong>Labs</strong>
                  </div>
                  <button
                    onClick={onCloseMobile}
                    className="text-2xl opacity-60 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 flex flex-col px-6 py-8 gap-6">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={handleItemClick}
                      className={`flex flex-row items-center gap-4 hover:cursor-pointer transition-all py-3 px-4 rounded-lg ${
                        item.active
                          ? "bg-[#1C1C1C]"
                          : "opacity-60 hover:opacity-100 hover:bg-[#1C1C1C]/50"
                      }`}
                    >
                      <i className={`hn ${item.icon} text-2xl`}></i>
                      <p className="text-base">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-6 border-t border-[#1C1C1C]">
                  <p className="text-xs opacity-60 text-center">
                    © 2025 CIA Labs
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}