"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getToken,
  clearTokens,
  clearUserId,
  getRefreshToken,
} from "@/lib/auth";
import { apiFetch } from "@/lib/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
    }
  }, [router]);

  async function handleLogout() {
    try {
      await apiFetch("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken: getRefreshToken() }),
      });
    } catch {
      // proceed regardless
    } finally {
      clearTokens();
      clearUserId();
      router.push("/login");
    }
  }

  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.5rem",
          borderBottom: "1px solid var(--color-border, #2a2a2a)",
        }}
      >
        <Link href="/" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
          Mermaid Flow
        </Link>
        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/documents">Documents</Link>
          <Link href="/settings">Settings</Link>
          <button onClick={handleLogout}>Sign Out</button>
        </nav>
      </header>
      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
}
