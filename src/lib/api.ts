// lib/api.ts

import type { AuthResponse } from "@/types/api";
import { saveTokens, getToken, getRefreshToken } from "@/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5209";

export interface ApiFetchOptions extends RequestInit {
  authToken?: string | null;
}

async function _fetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { authToken, ...fetchOptions } = options;
  const token = authToken ?? getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.title ?? "Request failed"), {
      status: res.status,
      detail: err,
    });
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  const data = await _fetch<AuthResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
  saveTokens(data.token, data.refreshToken);
  return data.token;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  try {
    return await _fetch<T>(path, options);
  } catch (err: unknown) {
    const apiErr = err as { status?: number };
    if (apiErr.status === 401 && !options.authToken) {
      await refreshAccessToken();
      return _fetch<T>(path, options);
    }
    throw err;
  }
}

export { BASE_URL };
