import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { InviteForm, DeleteButton } from "./Components";

export default async function SuperAdminPage() {
  const client = await clerkClient();

  const [{ data: users }, { data: invites }] = await Promise.all([
    client.users.getUserList({ orderBy: "-created_at" }),
    client.invitations.getInvitationList({ status: "pending" }),
  ]);

  const roles = await prisma.role.findMany({
    include: { _count: { select: { applications: true } } },
    orderBy: { createdAt: "desc" },
  });

  const applications = await prisma.application.findMany({
    include: { role: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    // PARENT: Natural height on mobile (min-h-screen), specific layout on Desktop
    <div className="flex flex-col overflow-scroll  lg:flex-row w-full min-h-screen bg-black text-white">
      {/* LEFT SIDEBAR 
         Mobile: Standard block with max-height to ensure content is reachable
         Desktop: Sticky sidebar that stays on screen while right side scrolls
      */}
      <aside className="w-full lg:w-[380px] border-b lg:border-b-0 lg:border-r border-[#1C1C1C] bg-black lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto z-20">
        <div className="p-6 space-y-8">
          {/* Header & Invite */}
          <section>
            <h1 className="text-2xl font-bold mb-4 tracking-tighter">
              Super Admin
            </h1>
            <InviteForm />
          </section>

          {/* Pending Invites */}
          <section>
            <h2 className="text-xs font-semibold uppercase opacity-40 mb-4 tracking-widest">
              Pending Invites ({invites.length})
            </h2>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
              {invites.length === 0 ? (
                <p className="text-xs opacity-30 ">No pending invites</p>
              ) : (
                invites.map((i) => (
                  <div
                    key={i.id}
                    className="p-3 border border-neutral-800  bg-neutral-900/30 text-sm flex justify-between items-center"
                  >
                    <span className="truncate mr-2 text-xs">
                      {i.emailAddress}
                    </span>
                    <span className="text-[9px] bg-orange-500/10 text-orange-500 px-2 py-0.5  font-bold">
                      SENT
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Active Admins */}
          <section className="pb-6">
            <h2 className="text-xs font-semibold uppercase opacity-40 mb-4 tracking-widest">
              Active Admins
            </h2>
            <div className=" border border-neutral-800 bg-neutral-900/20 divide-y divide-neutral-800 max-h-[300px] overflow-y-auto custom-scrollbar">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="p-3 flex justify-between items-center hover:bg-neutral-900/40 transition-colors"
                >
                  <div className="truncate pr-2">
                    <p className="text-xs truncate font-medium">
                      {u.emailAddresses[0].emailAddress}
                    </p>
                    <p className="text-[10px] opacity-40 uppercase">
                      {(u.publicMetadata.role as string) || "admin"}
                    </p>
                  </div>
                  <DeleteButton userId={u.id} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT
         Mobile: Stacks naturally below sidebar
         Desktop: Fills remaining width
      */}
      <main className="flex-1 min-w-0 bg-[#0A0A0A]">
        <div className="p-6 lg:p-10 space-y-12 max-w-7xl mx-auto pb-20">
          {/* ROLES GRID */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold  tracking-tighter">
                Hiring Roles
              </h2>
              <button className="w-full sm:w-auto text-xs bg-white text-black px-6 py-2.5 -full font-bold hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                + Create Role
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="group p-5 border border-neutral-800 -xl bg-neutral-900/20 hover:border-neutral-600 hover:bg-neutral-900/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg leading-tight pr-4">
                      {role.title}
                    </h3>
                    <div
                      className={`h-2 w-2 -full rounded-full flex-shrink-0 mt-1.5 ${
                        role.isOpen
                          ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                          : "bg-red-500"
                      }`}
                      title={role.isOpen ? "Open" : "Closed"}
                    />
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2 mb-6 h-8 leading-relaxed">
                    {role.description}
                  </p>
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-tighter pt-4 border-t border-neutral-800/50 group-hover:border-neutral-700/50 transition-colors">
                    <span className="opacity-40">{role.type}</span>
                    <span className="bg-neutral-800 px-2 py-0.5  text-neutral-300 group-hover:bg-neutral-700 transition-colors">
                      {role._count.applications} Applications
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* APPLICATIONS SECTION */}
          <section className=" mb-12">
            <h2 className="text-3xl font-bold  mb-8 tracking-tighter">
              Recent Applications
            </h2>

            {/* Desktop Table */}
            <div className="hidden md:block border border-neutral-800 -xl overflow-hidden bg-neutral-900/10">
              <table className="w-full text-left text-sm border-separate border-spacing-0">
                <thead className="bg-neutral-900/50 text-[10px] uppercase tracking-widest text-neutral-500">
                  <tr>
                    <th className="p-4 font-semibold border-b border-neutral-800">
                      Applicant
                    </th>
                    <th className="p-4 font-semibold border-b border-neutral-800">
                      Role
                    </th>
                    <th className="p-4 font-semibold border-b border-neutral-800">
                      Date
                    </th>
                    <th className="p-4 text-right font-semibold border-b border-neutral-800">
                      Resume
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-neutral-800/30 transition-colors group cursor-pointer"
                    >
                      <td className="p-4">
                        {/* LINK WRAPPER */}
                        <a
                          href={`/super-admin/view/${app.id}`}
                          className="block"
                        >
                          <div className="font-bold text-neutral-200 group-hover:underline decoration-neutral-500 underline-offset-4">
                            {app.name}
                          </div>
                          <div className="text-xs opacity-40 font-mono">
                            {app.email}
                          </div>
                        </a>
                      </td>
                      <td className="p-4 text-xs font-medium text-neutral-400">
                        {app.role.title}
                      </td>
                      <td className="p-4 text-[10px] opacity-40 font-mono">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        {app.resumeUrl && (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            className="text-neutral-500 hover:text-white transition-colors text-xs underline underline-offset-4"
                          >
                            View
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List (Card View) */}
            <div className="md:hidden space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 border border-neutral-800 -lg bg-neutral-900/40"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm">{app.name}</h4>
                    <span className="text-[10px] opacity-40 font-mono">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-3">
                    {app.role.title}
                  </p>
                  {app.resumeUrl && (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      className="text-xs text-blue-400 font-medium hover:underline"
                    >
                      View Resume →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
