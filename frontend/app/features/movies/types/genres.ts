import * as z from "zod";

export const MovieGenresSchema = z.object({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type MovieGenres = z.infer<typeof MovieGenresSchema>;
