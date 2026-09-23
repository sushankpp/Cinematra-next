import { User } from "@/types/context/authContext.types";

/**
 * Checks if a user has admin privileges.
 * Considers:
 * 1. user.role === "superadmin" or "admin"
 * 2. user.email matches NEXT_PUBLIC_ADMIN_EMAILS / NEXT_PUBLIC_ADMIN_EMAIL
 * 3. user.email contains "admin" (e.g., admin@..., superadmin@...)
 */
export function isAdminUser(user?: User | { role?: string; email?: string } | null): boolean {
  if (!user) return false;

  // 1. Check role
  if (user.role) {
    const role = user.role.toLowerCase().trim();
    if (role === "superadmin" || role === "admin") {
      return true;
    }
  }

  // 2. Check email
  if (user.email) {
    const email = user.email.toLowerCase().trim();

    // Check environment variable configured emails
    const envEmails = (
      process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      ""
    )
      .toLowerCase()
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (envEmails.includes(email)) {
      return true;
    }

    // Check if email contains "admin" or is an admin email
    if (email.includes("admin")) {
      return true;
    }
  }

  return false;
}
