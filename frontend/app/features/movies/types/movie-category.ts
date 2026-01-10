import * as z from "zod";

export const MovieCategorySchema = z.enum([
  "top_rated",
  "popular",
  "now_playing",
  "upcoming",
]);

export type MovieCategory = z.infer<typeof MovieCategorySchema>;
