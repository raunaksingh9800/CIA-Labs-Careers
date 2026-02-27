"use client";

import { useActionState, useTransition } from "react";
import { inviteNewAdmin, deleteUserAction, ActionState } from "../actions/admin-actions";

export function InviteForm() {
  const initialState: ActionState = { success: false, error: null };
  const [state, action, isPending] = useActionState(inviteNewAdmin, initialState);

  return (
    <form action={action} className="flex flex-col gap-4 max-w-md">
      <input name="email" type="email" placeholder="Email Address" required disabled={isPending} className="p-2  bg-neutral-900 border border-neutral-800" />
      <button type="submit" disabled={isPending} className="bg-white text-black py-2  font-bold">
        {isPending ? "Sending..." : "Invite Admin"}
      </button>
      {state?.success && <p className="text-green-500 text-sm">Invite Sent!</p>}
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
    </form>
  );
}

export function DeleteButton({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      className="text-red-500 text-sm hover:underline"
      onClick={() => {
        if (confirm("Delete this user?")) {
          startTransition(() => deleteUserAction(userId));
        }
      }}
    >
      {isPending ? "..." : "Delete"}
    </button>
  );
}