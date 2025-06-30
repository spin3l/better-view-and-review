import { createQueryKeys } from "@lukemorales/query-key-factory";
import { QueryClient } from "@tanstack/react-query";
import { getMovieGenres, getDiscoverMovies } from "./api";

const queryClient = new QueryClient();

export const movies = createQueryKeys("movies", {
  getById: (id: number) => ({
    queryKey: [id] as const,
    queryFn: () => Promise.resolve([]),
  }),
  getRandom: {
    queryKey: null,
    queryFn: () => getDiscoverMovies(),
  },
});

export const movieGenres = createQueryKeys("movieGenres", {
  getAll: {
    queryKey: null,
    queryFn: () => getMovieGenres(),
  },
});

export { queryClient as const };
