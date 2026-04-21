import { redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";

const hasRole = (roleValue: string | null | undefined, role: string): boolean =>
  roleValue?.split(",").includes(role) ?? false;

export const privateProcedure = async () => {
  const { data: session, error } = await authClient.getSession();

  if (error || !session) {
    throw redirect({
      to: "/join",
    });
  }

  return session;
};

export const adminProcedure = async () => {
  const session = await privateProcedure();

  if (!hasRole(session.user.role, "admin")) {
    throw redirect({
      to: "/404",
    });
  }

  return session;
};

export { hasRole };
