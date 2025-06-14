import MovieList from "@/features/movies/components/movie-list";
import type { Movie } from "../types/movie";

interface Props {
  discover: Movie[];
  upcoming: Movie[];
}

function MainPage({ discover, upcoming }: Props) {
  return (
    <article className="h-fit w-full">
      <MovieList title="Discover" movies={discover} />
      <MovieList title="Upcoming" movies={upcoming} />
    </article>
  );
}

export default MainPage;
