"use client";

import React from "react";

interface NavProps {
  onMenuToggle: () => void;
}

export default function Nav({ onMenuToggle }: NavProps) {
  return (
    <nav className="h-[10vh] w-full flex items-center justify-between px-8 border-b border-[#1C1C1C]">
      <div className="flex flex-row items-center justify-center gap-4 -ml-2">
        {/* Hamburger Menu - Only visible on mobile */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-2xl  opacity-60 hover:opacity-100 flex flex-row justify-center items-center transition-opacity "
          aria-label="Toggle menu"
        >
          <i className="hn hn-divider"></i>
        </button>

        {/* Desktop Menu Icon */}

        <div className="text-lg lg:text-xl">
          CIA <strong>Labs</strong> / Careers
        </div>
      </div>
      <a
        href="/admin"
        className="inline-block font-medium text-sm underline opacity-60"
      >
        Admin
      </a>
    </nav>
  );
}