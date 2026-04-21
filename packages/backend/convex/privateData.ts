import { query } from "./_generated/server";
import { privateProcedure } from "./auth-guards";

export const get = query({
  args: {},
  handler: async (ctx) => {
    try {
      await privateProcedure(ctx);
    } catch {
      return {
        message: "Not authenticated",
      };
    }

    return {
      message: "This is private",
    };
  },
});
