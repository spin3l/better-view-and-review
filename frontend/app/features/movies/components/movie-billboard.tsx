import { useSuspenseQuery } from "@tanstack/react-query";
import { Bookmark, Heart } from "lucide-react";
import { Suspense } from "react";
import { movieGenres } from "../lib/queries";
import type { Movie } from "../types/movie";
import MovieBillboardAction from "./movie-billboard-action";
import GenrePill from "./genre-pill";

interface Props {
  movie: Movie;
}

function MovieBillboard({ movie }: Props) {
  const query = useSuspenseQuery(movieGenres.getAll);

  const genres = query.data
    ? movie.genre_ids.map(
        (id) =>
          query.data.genres.find(({ id: _id }) => id === _id)?.name ?? "unknown"
      )
    : [];

  return (
    <div className="relative h-full w-full rounded-lg bg-accent flex flex-col gap-2">
      <div className="relative">
        <div className="absolute flex gap-2 items-center justify-center right-0 bottom-0 translate-x-2 translate-y-4 h-8 w-32 z-1">
          <MovieBillboardAction
            icon={<Bookmark />}
            onClick={() => console.log("Bookmarked")}
          />
          <MovieBillboardAction
            icon={<Heart />}
            onClick={() => console.log("Liked")}
          />
        </div>
        <Suspense fallback="Loading">
          <div className="overflow-hidden rounded-t-lg group">
            <img
              src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}.jpg`}
              className="w-full aspect-[2/3] object-cover rounded-t-lg transition-transform duration-300 hover:scale-120 hover:cursor-pointer group-hover:brightness-50"
            />
          </div>
        </Suspense>
      </div>
      {/* Movie Description */}
      <div className="pt-4 p-4 flex flex-col gap-2">
        <div className="flex flex-col font-thin text-sm overflow-x-scroll">
          <p>{movie.release_date.split("-")[0]}</p>
          <Suspense fallback="Loading">
            <div>
              {genres.slice(0, 3).map((genre, index) => (
                <span key={genre}>
                  <GenrePill name={genre} />
                  {index < Math.min(2, genres.length - 1) ? ", " : ""}
                </span>
              ))}
              {genres.length > 3 && <span>…</span>}
            </div>
          </Suspense>
        </div>
        <div className="font-semibold truncate whitespace-nowrap">
          {movie.title}
        </div>
      </div>
    </div>
  );
}

export default MovieBillboard;
