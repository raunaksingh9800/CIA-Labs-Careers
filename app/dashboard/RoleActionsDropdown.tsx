"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  roleId: string;
};

export default function RoleActionsDropdown({ roleId }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleDelete() {
    const ok = confirm("Delete this role? This action is irreversible.");
    if (!ok) return;

    await fetch(`/api/admin/roles/${roleId}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 rounded hover:bg-white/10"
      >
        ⋮
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded border border-white/20 bg-black shadow-lg z-50">
          <button
            onClick={() => router.push(`/admin/roles/${roleId}/edit`)}
            className="w-full text-left px-4 py-2 hover:bg-white/10"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
