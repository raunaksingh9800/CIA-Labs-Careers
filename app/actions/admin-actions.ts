'use server'

import { clerkClient, auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export interface ActionState {
  success?: boolean;
  error?: string | null;
}

export async function inviteNewAdmin(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const { sessionClaims } = await auth();
  const email = formData.get('email') as string;

  if (sessionClaims?.metadata.role !== 'super-admin') {
    return { success: false, error: "Unauthorized: Super Admin only." };
  }

  try {
    const client = await clerkClient();
    await client.invitations.createInvitation({
      emailAddress: email,
      publicMetadata: { role: 'admin' },
      ignoreExisting: true,
    });
    revalidatePath('/super-admin');
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.errors?.[0]?.longMessage || "Failed to invite." };
  }
}

export async function deleteUserAction(userId: string) {
  const { userId: requesterId, sessionClaims } = await auth();

  if (sessionClaims?.metadata.role !== 'super-admin') throw new Error("Unauthorized");
  if (requesterId === userId) throw new Error("Cannot delete yourself");

  const client = await clerkClient();
  await client.users.deleteUser(userId);
  revalidatePath('/super-admin');
}