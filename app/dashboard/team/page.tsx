"use client";
import { useState } from "react";
// Removed duplicate useState import
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge
import { cn } from "@/lib/utils"; // Import cn

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
            <label className="block text-xs font-medium mb-1" id="invite-role-label">Role</label> {/* Added id for aria-labelledby */}
            <select
              className="border rounded px-2 py-1 text-sm"
              value={inviteRole}
              onChange={e => setInviteRole(e.target.value as Role)}
              aria-labelledby="invite-role-label" // Added aria-labelledby
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <Button type="submit" className="h-9">Invite</Button>
        </form>
      </div>

      {/* Adjusted table container and table styling */}
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50"> {/* Slightly lighter head */}
            <tr>
              <th className="px-3 py-2 text-left font-semibold">Name</th> {/* Adjusted padding */}
              <th className="px-3 py-2 text-left font-semibold">Email</th> {/* Adjusted padding */}
              <th className="px-3 py-2 text-left font-semibold">Role</th> {/* Adjusted padding */}
              <th className="px-3 py-2 text-left font-semibold">Status</th> {/* Adjusted padding */}
              <th className="px-3 py-2"></th> {/* Adjusted padding */}
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id} className={cn("border-t", index % 2 === 0 ? "" : "bg-muted/20")}> {/* Alternating rows */}
                <td className="px-3 py-1.5">{member.name}</td> {/* Adjusted padding */}
                <td className="px-3 py-1.5">{member.email}</td> {/* Adjusted padding */}
                <td className="px-3 py-1.5"> {/* Adjusted padding */}
                  <select
                    className="border rounded px-2 py-1 text-sm bg-background" /* Added bg */
                    value={member.role}
                    onChange={e => handleRoleChange(member.id, e.target.value as Role)}
                    disabled={member.status !== "Active"}
                    aria-label={`Role for ${member.name}`} // Added aria-label
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </td>
                <td className="px-3 py-1.5">{/* Adjusted padding */}
                  {member.status === "Active" ? (
                    <Badge variant="default">{member.status}</Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-orange-400 text-orange-500 dark:border-orange-600 dark:text-orange-500"
                    >
                      {member.status}
                    </Badge>
                  )}
                </td>
                <td className="px-3 py-1.5 text-right"> {/* Adjusted padding */}
                  {member.status === "Active" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(member.id)}
                    >
                      Remove
                    </Button>
                  )}
                  {/* Removed plain text pending status, handled by Badge above */}
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
              <thead className="bg-muted/50"> {/* Slightly lighter head */}
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Email</th> {/* Adjusted padding */}
                  <th className="px-3 py-2"></th> {/* Adjusted padding */}
                </tr>
              </thead>
              <tbody>
                {invites.map((invite, index) => ( // Added index
                  <tr key={invite.id} className={cn("border-t", index % 2 === 0 ? "" : "bg-muted/20")}> {/* Alternating rows */}
                    <td className="px-3 py-1.5">{invite.email}</td> {/* Adjusted padding */}
                    <td className="px-3 py-1.5 text-right flex gap-2"> {/* Adjusted padding */}
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
