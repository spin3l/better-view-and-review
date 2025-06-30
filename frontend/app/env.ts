import { z } from "zod";

const isBrowser = typeof window !== "undefined";

const envSchema = z.object({
  TMDB_API_KEY: z.string(),
});

export const env = (() => {
  if (isBrowser) {
    return {};
  }

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Error parsing environment variables:", parsed.error.format);
    throw new Error("Invalid environment variables");
  }
  console.log(
    "Parsed environment variables:",
    JSON.stringify(parsed.data, null, 2)
  );

  return parsed.data;
})();
