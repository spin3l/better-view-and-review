import type { Movie } from "@/features/movies/types/movie";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import MovieBillboard from "./movie-billboard";

interface Props {
  title: string;
  movies: Movie[];
}

const renderListTitle = (title: string) => {
  return (
    <div className="flex gap-8 text-accent items-end">
      <h2 className="text-2xl font-bold h-fit">{title}</h2>
      <Link
        className="flex items-center justify-start hover:cursor-pointer"
        to={{ pathname: `/list/${title.toLowerCase()}` }}
      >
        <h3 className="text-md">See more</h3>
        <ChevronRight className="stroke-2 size-4 ml-1" />
      </Link>
    </div>
  );
};

function MovieList({ title, movies }: Props) {
  return (
    <div className="flex flex-col gap-y-2 py-4 px-8 ">
      {renderListTitle(title)}
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
