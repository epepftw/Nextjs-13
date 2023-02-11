import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),

  deenice: procedure
    .input(
      z.object({
        owner: z.string(),
        age: z.number(),
      })
    )
    .query(({ input }) => {
      return {
        name: `I am ${input.owner} and i'm ${input.age} years old`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
