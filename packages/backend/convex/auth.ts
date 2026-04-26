import { createClient } from "@convex-dev/better-auth";
import type { GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth/minimal";
import type { BetterAuthOptions } from "better-auth/minimal";
import { admin } from "better-auth/plugins";
import { v } from "convex/values";

import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import authConfig from "./auth.config";
import authSchema from "./betterAuth/schema";

const siteUrl = process.env.SITE_URL ?? "";

export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema,
    },
  }
);

const hasRole = (roleValue: string | null | undefined, role: string): boolean =>
  roleValue?.split(",").includes(role) ?? false;

export const createAuthOptions = (
  ctx: GenericCtx<DataModel>
): BetterAuthOptions => ({
  database: authComponent.adapter(ctx),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    admin(),
    crossDomain({ siteUrl }),
    convex({
      authConfig,
      jwksRotateOnTokenGenerationError: true,
    }),
  ],
  trustedOrigins: [siteUrl],
});

const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth(createAuthOptions(ctx));

export { createAuth };

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => await authComponent.safeGetAuthUser(ctx),
});

export const isCurrentUserAdmin = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    return hasRole(authUser?.role, "admin");
  },
  returns: v.boolean(),
});

export const bootstrapFirstAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Not authenticated");
    }

    return await ctx.runMutation(
      components.betterAuth.admin.bootstrapFirstAdmin,
      {
        userId: authUser._id,
      }
    );
  },
  returns: v.boolean(),
});
