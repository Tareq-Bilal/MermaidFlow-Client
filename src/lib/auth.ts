// lib/auth.ts

export const saveTokens = (token: string, refreshToken: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const getRefreshToken = () =>
  typeof window !== "undefined"
    ? (localStorage.getItem("refreshToken") ?? "")
    : "";

export const getUserId = () =>
  typeof window !== "undefined" ? localStorage.getItem("userId") : null;

export const saveUserId = (userId: string) =>
  localStorage.setItem("userId", userId);

export const clearUserId = () => localStorage.removeItem("userId");
