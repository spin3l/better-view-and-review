import { Link } from "react-router";
import { useMoviesContext } from "../context/movies-wrapper";
import type { Movie } from "../types/movie";
import GenrePill from "./genre-pill";
import { MovieActions } from "./movie-actions";

interface MovieBillboardProps {
  movie: Movie;
}

function MovieBillboard({ movie }: MovieBillboardProps) {
  const { movieGenres } = useMoviesContext();

  const genres = movieGenres
    ? movie.genre_ids.map(
        (id) =>
          movieGenres.genres.find(({ id: _id }) => id === _id)?.name ??
          "unknown"
      )
    : [];

  return (
    <div className="relative bg-gray-200 flex flex-col gap-2 shadow-lg">
      <div className="relative">
        <MovieActions />
        <Link to={{ pathname: "/movies", search: `?movie=${movie.id}` }}>
          <div className="overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}.jpg`}
              className="w-full aspect-[2/3] object-cover transition-transform duration-300 hover:scale-120 hover:cursor-pointer hover:brightness-50"
            />
          </div>
        </Link>
      </div>
      {/* Movie Description */}
      <div className="pt-4 p-4 flex flex-col gap-2">
        <div className="flex flex-col font-thin text-xs overflow-x-scroll">
          <p className="pointer-events-none !text-sm">
            {movie.release_date.split("-")[0]}
          </p>
          <div className="pointer-events-none">
            {genres.slice(0, 3).map((genre, index) => (
              <span key={genre}>
                <GenrePill name={genre} />
                {index < Math.min(2, genres.length - 1) ? ", " : ""}
              </span>
            ))}
            {genres.length > 3 && <span>…</span>}
          </div>
        </div>
        <div className="font-semibold truncate whitespace-nowrap pointer-events-none">
          {movie.title}
        </div>
      </div>
    </div>
  );
}

export default MovieBillboard;
