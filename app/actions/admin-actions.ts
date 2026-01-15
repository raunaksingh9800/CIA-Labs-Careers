// app/actions/admin-actions.ts
'use server'
import { clerkClient } from '@clerk/nextjs/server';

// Added 'prevState' as the first argument
export async function inviteNewAdmin(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const client = await clerkClient();

  try {
    await client.invitations.createInvitation({
      emailAddress: email,
      publicMetadata: { role: 'admin' },
      ignoreExisting: true,
    });

    return { success: true, error: null };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.errors?.[0]?.longMessage || "Something went wrong" 
    };
  }
}