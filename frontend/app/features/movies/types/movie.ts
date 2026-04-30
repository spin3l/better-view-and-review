import * as z from "zod";

export const MovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string().refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), {
    message: "Invalid date format, expected YYYY-MM-DD",
  }),
  title: z.string(),
  video: z.boolean(),
  videos: z
    .object({
      results: z.array(
        z.object({
          key: z.string(),
          site: z.string(),
        }),
      ),
    })
    .nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type Movie = z.infer<typeof MovieSchema>;
