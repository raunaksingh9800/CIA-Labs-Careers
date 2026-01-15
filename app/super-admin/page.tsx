// app/super-admin/page.tsx
import InviteForm from "./InviteForm";

export default function SuperAdminPage() {
  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Invite New Admin</h1>
      <p className="text-sm opacity-60 mb-6">
        Invited users will receive an email to join as an "Admin".
      </p>
      <InviteForm />
    </div>
  );
}