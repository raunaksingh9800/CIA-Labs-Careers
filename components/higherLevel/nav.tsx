"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

interface NavProps {
  onMenuToggle: () => void;
}

export default function Nav({ onMenuToggle }: NavProps) {
  return (
    <nav className="h-[10vh] w-full flex items-center justify-between px-8 border-b border-[#1C1C1C]">
      <div className="flex flex-row items-center justify-center gap-4 -ml-2">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-2xl opacity-60 hover:opacity-100 flex flex-row justify-center items-center transition-opacity"
          aria-label="Toggle menu"
        >
          <i className="hn hn-divider"></i>
        </button>

        <div className="text-lg lg:text-xl">
          CIA <strong>Labs</strong> / Careers
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-6">
        {/* Only show User Profile when logged in */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Only show Admin Login button when logged out */}
        <SignedOut>
          <div className="inline-block font-medium text-sm underline opacity-60">
            <SignInButton>
              <button>Admin</button> 
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}