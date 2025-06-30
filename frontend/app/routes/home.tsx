import MovieList from "@/features/movies/components/movie-list";
import {
  getDiscoverMovies,
  getMovieGenres,
  getUpcoming,
} from "@/features/movies/lib/api";
import type { Route } from "./+types/home";
import MoviesWrapper from "@/features/movies/context/movies-wrapper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "View and Review" },
    { name: "description", content: "Welcome to View and Review" },
  ];
}

export async function loader() {
  const [discover, upcoming, movieGenres] = await Promise.all([
    getDiscoverMovies(),
    getUpcoming(),
    getMovieGenres(),
  ]);
  return { discover, upcoming, movieGenres };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { discover, upcoming, movieGenres } = loaderData;
  return (
    <MoviesWrapper movieGenres={movieGenres} className="h-128 w-full">
      <MovieList title="Discover">{discover.results}</MovieList>
      <MovieList title="Upcoming">{upcoming.results}</MovieList>
    </MoviesWrapper>
  );
}
