import MovieList from "@/features/movies/components/movie-list";
import type { Movie } from "../types/movie";

interface Props {
  movies: Movie[];
}

function MainPage({ movies }: Props) {
  return (
    <article className="h-fit w-full bg-gray-200">
      <MovieList title="Example" movies={movies} />
    </article>
  );
}

export default MainPage;
