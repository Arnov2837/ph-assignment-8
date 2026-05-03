"use client";

import { createAuthClient } from "better-auth/react";

function resolveAuthOrigin() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const raw =
    process.env.NEXT_PUBLIC_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.BETTER_AUTH_URL ||
    "";
  if (!raw) return "http://localhost:3000";
  try {
    const normalized = raw.replace(/\/api\/auth\/?$/i, "").replace(/\/$/, "");
    return new URL(normalized).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export const authClient = createAuthClient({
  baseURL: resolveAuthOrigin(),
});