import { createQueryKeys } from "@lukemorales/query-key-factory";
import { QueryClient } from "@tanstack/react-query";
import { getRandomMovies } from "./api";

const queryClient = new QueryClient();

export const movies = createQueryKeys("movies", {
  getById: (id: number) => ({
    queryKey: [id] as const,
    queryFn: () => Promise.resolve([]),
  }),
  getRandom: {
    queryKey: null,
    queryFn: () => getRandomMovies(),
  },
});

export { queryClient as const };
