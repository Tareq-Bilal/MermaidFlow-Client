"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getUserId, clearTokens, clearUserId } from "@/lib/auth";
import type { UserResponse } from "@/types/api";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(
    null,
  );

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      router.replace("/login");
      return;
    }
    apiFetch<UserResponse>(`/users/${userId}`)
      .then((data) => {
        setUser(data);
        setDisplayName(data.displayName);
        setEmail(data.email);
      })
      .catch((err: { status?: number }) => {
        if (err.status === 401) router.replace("/login");
      });
  }, [router]);

  async function handleUpdateDisplayName(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);
    try {
      const updated = await apiFetch<UserResponse>(
        `/users/${user.id}/display-name`,
        { method: "PATCH", body: JSON.stringify({ displayName }) },
      );
      setUser(updated);
      setMessage({ text: "Display name updated.", ok: true });
    } catch {
      setMessage({ text: "Failed to update display name.", ok: false });
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);
    try {
      const updated = await apiFetch<UserResponse>(`/users/${user.id}/email`, {
        method: "PATCH",
        body: JSON.stringify({ email }),
      });
      setUser(updated);
      setMessage({ text: "Email updated.", ok: true });
    } catch {
      setMessage({ text: "Failed to update email.", ok: false });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (!user) return;
    if (!window.confirm("Delete your account? This cannot be undone.")) return;
    try {
      await apiFetch(`/users/${user.id}`, { method: "DELETE" });
      clearTokens();
      clearUserId();
      router.push("/");
    } catch {
      setMessage({ text: "Failed to delete account.", ok: false });
    }
  }

  if (!user) return <p>Loading…</p>;

  return (
    <div style={{ maxWidth: 480 }}>
      <h1>Settings</h1>

      {message && (
        <p style={{ color: message.ok ? "green" : "red" }}>{message.text}</p>
      )}

      <section style={{ marginBottom: "2rem" }}>
        <h2>Display Name</h2>
        <form
          onSubmit={handleUpdateDisplayName}
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <button type="submit" disabled={saving}>
            Save
          </button>
        </form>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Email</h2>
        <form
          onSubmit={handleUpdateEmail}
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={saving}>
            Save
          </button>
        </form>
      </section>

      <section>
        <h2>Account</h2>
        <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
        <button onClick={handleDeleteAccount} style={{ color: "red" }}>
          Delete Account
        </button>
      </section>
    </div>
  );
}
