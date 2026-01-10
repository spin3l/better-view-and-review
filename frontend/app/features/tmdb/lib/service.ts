import { createApiInstance } from "@/api";

const TMDB_INSTANCE = createApiInstance("https://api.themoviedb.org/3/");

export { TMDB_INSTANCE };
