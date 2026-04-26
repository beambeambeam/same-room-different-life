import type { FunctionReference } from "convex/server";
import { v } from "convex/values";

import { components } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { createAuth } from "./auth";

interface SeedRootAdminResult {
  createdUser: boolean;
  promotedToAdmin: boolean;
  userId: string;
}

export const seedRootAdmin = internalAction({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<SeedRootAdminResult> => {
    const email = args.email.toLowerCase();
    const betterAuthAdmin = components.betterAuth.admin as Record<
      string,
      unknown
    >;
    const findUserIdByEmail =
      betterAuthAdmin.findUserIdByEmail as FunctionReference<
        "query",
        "internal",
        { email: string },
        string | null
      >;
    const hasAnyAdmin = await ctx.runQuery(
      components.betterAuth.admin.hasAnyAdmin,
      {}
    );

    if (hasAnyAdmin) {
      throw new Error("An admin already exists; skipping root admin seed.");
    }

    let userId = await ctx.runQuery(findUserIdByEmail, { email });
    let createdUser = false;

    if (!userId) {
      const auth = createAuth(ctx);
      const result = await auth.api.signUpEmail({
        body: {
          email,
          name: args.name,
          password: args.password,
        },
      });

      userId = result.user.id;
      createdUser = true;
    }

    const promotedToAdmin = await ctx.runMutation(
      components.betterAuth.admin.bootstrapFirstAdmin,
      {
        userId,
      }
    );

    if (!promotedToAdmin) {
      throw new Error("Failed to promote the seeded user to admin.");
    }

    return {
      createdUser,
      promotedToAdmin,
      userId,
    };
  },
});
