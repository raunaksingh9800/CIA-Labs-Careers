"use client";

import { createContext, useContext, useState } from "react";

type FilterState = {
  query: string;
  year: number | null;
  branch: string;
  type: string;
};

type FilterContextType = FilterState & {
  setQuery: (v: string) => void;
  setYear: (v: number | null) => void;
  setBranch: (v: string) => void;
  setType: (v: string) => void;
  clear: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [branch, setBranch] = useState("");
  const [type, setType] = useState("");

  function clear() {
    setQuery("");
    setYear(null);
    setBranch("");
    setType("");
  }

  return (
    <FilterContext.Provider
      value={{
        query,
        year,
        branch,
        type,
        setQuery,
        setYear,
        setBranch,
        setType,
        clear,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be used inside FilterProvider");
  return ctx;
}
