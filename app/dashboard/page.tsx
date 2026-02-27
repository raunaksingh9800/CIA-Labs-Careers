"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import RoleActionsDropdown from "./RoleActionsDropdown";

type Role = {
  id: string;
  title: string;
  description: string;
};

type Application = {
  id: string;
  name: string;
  roleTitle: string;
  createdAt: string;
  resumeUrl: string | null;
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  const [roles, setRoles] = useState<Role[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    async function fetchData() {
      try {
        const [rolesRes, appsRes] = await Promise.all([
          fetch("/api/admin/client/roles"),
          fetch("/api/admin/client/applications"),
        ]);

        if (!rolesRes.ok || !appsRes.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const rolesData = await rolesRes.json();
        const appsData = await appsRes.json();

        setRoles(rolesData);
        setApplications(appsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isLoaded]);

  if (!isLoaded || loading) {
    return <div className="p-8 opacity-60">Loading dashboard…</div>;
  }

  const username =
    user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "Anonymous";

  return (
    <div className="w-full min-h-full overflow-y-scroll flex flex-col p-8">
      {/* HEADER */}
      <div className=" flex flex-row justify-between items-center">
        <div>
          {" "}
          <h1 className="text-lg opacity-60">Welcome,</h1>
          <span className="text-3xl mt-3">{username}</span>
        </div>
        <div>
            <a href="dashboard/create" className=" bg-white text-black px-3 py-2">Create Role</a>
        </div>
      </div>

      {/* ROLES */}
      <div className="mt-8">
        <h1 className="text-sm font-semibold opacity-40 mb-4">
          Roles posted by you
        </h1>

        {roles.length === 0 ? (
          <p className="opacity-60">No roles posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div key={role.id} className="border border-white/20 p-4">
                <div className="flex flex-row justify-between">
                  <h2 className="mb-3 text-xl">{role.title}</h2>
                  <RoleActionsDropdown roleId={role.id} />
                </div>

                <span className="opacity-60">{role.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* APPLICATIONS */}
      <div className="mt-8">
        <h1 className="text-sm font-semibold opacity-40 mb-4">Applications</h1>

        {applications.length === 0 ? (
          <p className="opacity-60">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto border border-white/20">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/20 text-left text-sm opacity-60">
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Resume</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-3 font-medium">{app.name}</td>
                    <td className="p-3">{app.roleTitle}</td>
                    <td className="p-3 opacity-70">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          className="text-blue-400 hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        <span className="opacity-40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
