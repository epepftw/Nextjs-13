import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  poke_id: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input }) => {
      return {
        id: `what but how?${input.id}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
