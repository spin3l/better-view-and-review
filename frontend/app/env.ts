import { z } from "zod";

const isBrowser = typeof window !== "undefined";

const EnvSchema = z.object({
  TMDB_API_KEY: z.string(),
});

type Environment = z.infer<typeof EnvSchema>;

export const env: Environment = (() => {
  if (isBrowser) {
    return {} as Environment;
  }

  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Error parsing environment variables:", parsed.error.format);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
})();
