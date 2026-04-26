import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const isAdminRole = (roleValue: string | null | undefined): boolean =>
  roleValue?.split(",").includes("admin") ?? false;

export const hasAnyAdmin = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("user").collect();
    return users.some((user) => isAdminRole(user.role));
  },
  returns: v.boolean(),
});

export const findUserIdByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.toLowerCase();
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), normalizedEmail))
      .unique();

    return user?._id ?? null;
  },
  returns: v.union(v.id("user"), v.null()),
});

export const bootstrapFirstAdmin = mutation({
  args: {
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("user").collect();
    if (users.some((user) => isAdminRole(user.role))) {
      return false;
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      role: "admin",
    });
    return true;
  },
  returns: v.boolean(),
});
