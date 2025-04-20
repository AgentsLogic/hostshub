"use client";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";

type Role = "Admin" | "Manager" | "Viewer";
type Status = "Active" | "Invited";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
}

interface Invite {
  id: string;
  email: string;
}

const initialMembers: TeamMember[] = [
  { id: "1", name: "Alice", email: "alice@email.com", role: "Admin", status: "Active" },
  { id: "2", name: "Bob", email: "bob@email.com", role: "Manager", status: "Active" },
  { id: "3", name: "Carol", email: "carol@email.com", role: "Viewer", status: "Invited" },
];

const initialInvites: Invite[] = [
  { id: "4", email: "dave@email.com" },
];

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [invites, setInvites] = useState<Invite[]>(initialInvites);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Viewer");

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail) return;
    setInvites([...invites, { id: Date.now().toString(), email: inviteEmail }]);
    setInviteEmail("");
    setInviteRole("Viewer");
  }

  function handleRoleChange(id: string, newRole: Role) {
    setMembers(members =>
      members.map(m => m.id === id ? { ...m, role: newRole } : m)
    );
  }

  function handleRemove(id: string) {
    setMembers(members => members.filter(m => m.id !== id));
  }

  function handleRevokeInvite(id: string) {
    setInvites(invites => invites.filter(i => i.id !== id));
  }

  function handleResendInvite(id: string) {
    // Mock resend action
    alert("Invite resent!");
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <form className="flex gap-2 items-end" onSubmit={handleInvite}>
          <div>
            <label className="block text-xs font-medium mb-1">Email</label>
            <input
              type="email"
              className="border rounded px-2 py-1 text-sm"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              required
              placeholder="user@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Role</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={inviteRole}
              onChange={e => setInviteRole(e.target.value as Role)}
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <Button type="submit" className="h-9">Invite</Button>
        </form>
      </div>

      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">Role</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id} className="border-t">
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{member.email}</td>
                <td className="px-4 py-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={member.role}
                    onChange={e => handleRoleChange(member.id, e.target.value as Role)}
                    disabled={member.status !== "Active"}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </td>
                <td className="px-4 py-2">{member.status}</td>
                <td className="px-4 py-2 text-right">
                  {member.status === "Active" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(member.id)}
                    >
                      Remove
                    </Button>
                  )}
                  {member.status === "Invited" && (
                    <span className="text-muted-foreground text-xs">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Pending Invites</h2>
          <div className="overflow-x-auto rounded border">
            <table className="min-w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Email</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {invites.map(invite => (
                  <tr key={invite.id} className="border-t">
                    <td className="px-4 py-2">{invite.email}</td>
                    <td className="px-4 py-2 text-right flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResendInvite(invite.id)}
                      >
                        Resend
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRevokeInvite(invite.id)}
                      >
                        Revoke
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
