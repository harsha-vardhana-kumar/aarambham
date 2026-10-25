import type { Role } from "@aarambham/core";
export type Capability =
  | "write"
  | "review"
  | "publish"
  | "manage-users"
  | "configure";
const policy: Record<Role, readonly Capability[]> = {
  "super-admin": ["write", "review", "publish", "manage-users", "configure"],
  admin: ["write", "review", "publish", "manage-users"],
  editor: ["write", "review", "publish"],
  reporter: ["write"],
};
/** Proposed policy only. UI checks are never an authorization boundary. */
export function hasCapability(role: Role, capability: Capability) {
  return policy[role].includes(capability);
}
export interface Session {
  userId: string;
  role: Role;
  expiresAt: string;
}
export interface AuthAdapter {
  getSession(): Promise<Session | null>;
  signOut(): Promise<void>;
}
export const authenticationAvailable = false;
