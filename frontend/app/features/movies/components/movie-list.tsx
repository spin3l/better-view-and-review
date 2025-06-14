import type { Movie } from "@/features/movies/types/movie";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import MovieBillboard from "./movie-billboard";

interface Props {
  title: string;
  movies: Movie[];
}

function MovieList({ title, movies }: Props) {
  return (
    <div className="flex flex-col gap-y-2 py-4 px-8">
      <Link
        className="flex gap-2 items-center justify-center w-fit hover:underline hover:cursor-pointer"
        to={{ pathname: `/list/${title.toLowerCase()}` }}
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <ChevronRight />
      </Link>
      <div className="flex gap-4 size-full overflow-x-scroll">
        {movies.map((movie, index) => (
          <div key={index} className="flex-shrink-0 w-64 h-full">
            <MovieBillboard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
