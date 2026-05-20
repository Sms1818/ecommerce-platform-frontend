import type { UserResponse } from "../types/auth";

export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN";

export const AUTH_STORAGE_KEY = "bazaar_auth_user";

/** Product create / update / delete (API + UI). */
export const canManageCatalog = (role: string | undefined): boolean =>
  role === "SELLER" || role === "ADMIN";

export const roleLabel = (role: string): string => {
  switch (role) {
    case "SELLER":
      return "Seller";
    case "ADMIN":
      return "Admin";
    default:
      return "Customer";
  }
};

export const userDisplayName = (user: UserResponse): string =>
  user.firstName?.trim() || user.username;

export const userInitials = (user: UserResponse): string => {
  const first = user.firstName?.charAt(0) ?? "";
  const last = user.lastName?.charAt(0) ?? "";
  if (first || last) return `${first}${last}`.toUpperCase();
  return user.username.charAt(0).toUpperCase();
};

export const parseStoredUser = (raw: string): UserResponse | null => {
  const auth = parseStoredAuth(raw);
  return auth?.user ?? null;
};

export type StoredAuth = { user: UserResponse; token: string | null };

export const parseStoredAuth = (raw: string): StoredAuth | null => {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && "user" in parsed) {
      const wrap = parsed as { user: UserResponse; token?: string | null };
      if (wrap.user?.id && wrap.user?.email) {
        return { user: wrap.user, token: wrap.token ?? null };
      }
    }
    const flat = parsed as UserResponse;
    if (flat?.id && flat?.email) {
      return { user: flat, token: null };
    }
    return null;
  } catch {
    return null;
  }
};

export const extractUserFromAuth = (data: {
  response?: UserResponse;
  user?: UserResponse;
}): UserResponse | null => data.response ?? data.user ?? null;
