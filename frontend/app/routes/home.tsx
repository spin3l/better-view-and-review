import MovieList from "@/features/movies/components/movie-list";
import MoviesWrapper from "@/features/movies/context/movies-wrapper";
import { movieService } from "@/features/movies/lib/service";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "View and Review" },
    { name: "description", content: "Welcome to View and Review" },
  ];
}

export async function loader() {
  const [movieGenres, discover, nowPlaying] = await Promise.all([
    movieService.getMovieGenres(),
    movieService.getDiscover(),
    movieService.getMovies("now_playing"),
  ]);

  return {
    movieGenres,
    discover,
    nowPlaying,
  };
}

export default function Home() {
  const { movieGenres, discover, nowPlaying } = useLoaderData<typeof loader>();

  return (
    <MoviesWrapper movieGenres={movieGenres} className="w-full h-128">
      <MovieList title="Now Playing">{nowPlaying.results}</MovieList>
      <MovieList title="Discover">{discover.results}</MovieList>
    </MoviesWrapper>
  );
}
