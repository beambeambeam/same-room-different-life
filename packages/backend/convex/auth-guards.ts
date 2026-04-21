import type { GenericCtx } from "@convex-dev/better-auth";

import type { DataModel } from "./_generated/dataModel";
import { authComponent } from "./auth";

export const hasRole = (
  roleValue: string | null | undefined,
  role: string
): boolean => roleValue?.split(",").includes(role) ?? false;

export const privateProcedure = async (ctx: GenericCtx<DataModel>) => {
  const authUser = await authComponent.safeGetAuthUser(ctx);

  if (!authUser) {
    throw new Error("Not authenticated");
  }

  return authUser;
};

export const adminProcedure = async (ctx: GenericCtx<DataModel>) => {
  const authUser = await privateProcedure(ctx);

  if (!hasRole(authUser.role, "admin")) {
    throw new Error("Not authorized");
  }

  return authUser;
};
