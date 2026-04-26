import { query } from "./_generated/server";
import { privateProcedure } from "./authguards";

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
