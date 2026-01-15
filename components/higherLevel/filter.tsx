"use client";

import React from "react";
import { useFilter } from "@/app/context/FilterContext";
import { AnimatePresence, motion } from "framer-motion";

interface FilterProps {
  showMobile?: boolean;
  onCloseMobile?: () => void;
}

// --- Custom Select Component ---
const StyledSelect = ({
  value,
  onChange,
  children,
  label,
  className = "",
}: {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  label?: string;
  className?: string;
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {label && <p className="opacity-60 mb-2">{label}</p>}
      <div className="relative inline-block w-full">
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={(e) => e.stopPropagation()}
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: 'none',
            borderRadius: 0,
          }}
          className={`
            w-full outline-none border-dotted border-white border 
            py-2 px-3 pr-10 bg-[#1C1C1C] text-white
            transition-opacity duration-200
            ${isFocused ? 'opacity-100' : 'opacity-60'}
            hover:opacity-80
            cursor-pointer
            block
          `}
        >
          {children}
        </select>
        
        {/* Custom Arrow */}

      </div>
      
      <style jsx>{`
        select {
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
          background-image: none !important;
          border-radius: 0 !important;
        }
        
        /* Style the dropdown options */
        select option {
          background-color: #1C1C1C;
          color: white;
          padding: 8px;
        }
        
        select option:checked,
        select option:hover {
          background-color: #2A2A2A;
        }
        
        /* Remove iOS styling */
        select::-webkit-textfield-decoration-container {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default function Filter({ showMobile = false, onCloseMobile }: FilterProps) {
  const {
    query,
    year,
    branch,
    type,
    setQuery,
    setYear,
    setBranch,
    setType,
    clear,
  } = useFilter();

  const handleDone = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  // Shared Options to keep JSX clean
  const YearOptions = () => (
    <>
      <option value="" disabled>Select year</option>
      <option value="1">1st Year</option>
      <option value="2">2nd Year</option>
      <option value="3">3rd Year</option>
      <option value="4">4th Year</option>
    </>
  );

  const BranchOptions = () => (
    <>
      <option value="" disabled>Select branch</option>
      <option value="any">Any</option>
      <option value="cse">Computer Science</option>
      <option value="ise">Information Science</option>
      <option value="aiml">AI / ML</option>
      <option value="ece">Electronics</option>
      <option value="mech">Mechanical</option>
      <option value="civil">Civil</option>
      <option value="ee">Electrical</option>
    </>
  );

  const TypeOptions = () => (
    <>
      <option value="" disabled>Select role type</option>
      <option value="tech_core">Tech Core</option>
      <option value="tech_ai">Tech AI</option>
      <option value="tech_web">Tech Web</option>
      <option value="media_design">Media Design</option>
      <option value="media_content">Media Content</option>
      <option value="media_video">Media Video</option>
      <option value="operations">Operations</option>
      <option value="management">Management</option>
      <option value="non_tech_general">Non-Tech General</option>
    </>
  );

  return (
    <>
      {/* Desktop Filter */}
      <div className="lg:w-[30vw] hidden min-h-full bg-[#1C1C1C] px-6 transition-all py-6 lg:flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key="filter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <h1 className="text-2xl font-medium">Role Search</h1>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="border-dotted mt-6 outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-2 px-3 bg-transparent rounded-none"
              placeholder="What role do you prefer"
            />

            <div className="flex flex-row justify-between mt-6 opacity-60">
              <p className="text-xl">Filters</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clear();
                }}
                className="text-xs underline hover:cursor-pointer"
              >
                Clear filter
              </button>
            </div>

            <StyledSelect
              label="Which Year?"
              value={year ?? ""}
              onChange={(e) => setYear(Number(e.target.value))}
              className="mt-7"
            >
              <YearOptions />
            </StyledSelect>

            <StyledSelect
              label="Which Branch?"
              value={branch ?? ""}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-6"
            >
              <BranchOptions />
            </StyledSelect>

            <StyledSelect
              label="Type"
              value={type ?? ""}
              onChange={(e) => setType(e.target.value)}
              className="mt-6"
            >
              <TypeOptions />
            </StyledSelect>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={onCloseMobile}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85vw] bg-[#1C1C1C] z-50 lg:hidden overflow-y-auto"
            >
              <div className="px-6 py-6 flex flex-col h-full">
                <div className="flex flex-row justify-between items-center">
                  <h1 className="text-2xl font-medium">Filters</h1>
                  <button
                    onClick={onCloseMobile}
                    className="text-2xl opacity-60 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-row justify-between mt-6 opacity-60">
                  <p className="text-lg">Active Filters</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clear();
                    }}
                    className="text-xs underline hover:cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>

                <StyledSelect
                  label="Which Year?"
                  value={year ?? ""}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="mt-7"
                >
                  <YearOptions />
                </StyledSelect>

                <StyledSelect
                  label="Which Branch?"
                  value={branch ?? ""}
                  onChange={(e) => setBranch(e.target.value)}
                  className="mt-6"
                >
                  <BranchOptions />
                </StyledSelect>

                <StyledSelect
                  label="Type"
                  value={type ?? ""}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-6"
                >
                  <TypeOptions />
                </StyledSelect>

                <div className="mt-auto pt-6">
                  <button
                    onClick={handleDone}
                    className="border-dotted w-full outline-0 transition-all border-white border py-3 px-2 bg-[#6EFF63] text-black font-medium hover:bg-[#5EEF53]"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}