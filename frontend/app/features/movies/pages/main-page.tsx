import MovieList from "@/features/movies/components/movie-list";
import type { Movie } from "../types/movie";

interface Props {
  movies: Movie[];
}

function MainPage({ movies }: Props) {
  return <MovieList title="Example" movies={movies} />;
}

export default MainPage;
