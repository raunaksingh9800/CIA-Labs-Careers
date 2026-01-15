// app/super-admin/InviteForm.tsx
"use client";

import { useActionState } from "react";
import { inviteNewAdmin } from "../actions/admin-actions";

export default function InviteForm() {
  // state is the return value from your action
  // action is what you put in the form's 'action' prop
  // isPending tells you if it's currently loading
  const [state, action, isPending] = useActionState(inviteNewAdmin, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input
        name="email"
        type="email"
        placeholder="admin-email@example.com"
        required
        disabled={isPending}
        className="p-2 rounded bg-neutral-900 border border-neutral-800 outline-none disabled:opacity-50"
      />
      
      <button
        type="submit"
        disabled={isPending}
        className="bg-white text-black font-bold py-2 rounded hover:bg-neutral-200 disabled:bg-neutral-500"
      >
        {isPending ? "Sending..." : "Send Invitation"}
      </button>

      {/* Success/Error Messages */}
      {state?.success && (
        <p className="text-green-500 text-sm">Invitation sent successfully!</p>
      )}
      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}
    </form>
  );
}