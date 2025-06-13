import type { Movie } from "@/features/movies/types/movie";
import MovieBillboard from "./movie-billboard";

interface Props {
  title: string;
  movies: Movie[];
}

function MovieList({ title, movies }: Props) {
  return (
    <div className="flex flex-col gap-y-2 py-4 px-2">
      <h2 className="font-bold">{title}</h2>
      <div className="flex gap-4 size-full overflow-x-scroll px-4">
        {movies.map((movie, index) => (
          <div key={index} className="flex-shrink-0 w-48 h-full">
            <MovieBillboard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
