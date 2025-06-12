import { createQueryKeys } from "@lukemorales/query-key-factory";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const movies = createQueryKeys("movies", {
  getAll: {
    queryKey: null,
    queryFn: () => Promise.resolve([]),
  },
  getById: (id: number) => ({
    queryKey: [id] as const,
    queryFn: () => Promise.resolve([]),
  }),
});

queryClient.invalidateQueries({
  queryKey: movies.getAll.queryKey,
  exact: true,
});

queryClient.invalidateQueries({
  queryKey: movies.getById(1).queryKey,
});
