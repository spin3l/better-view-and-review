"use client";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { movieGenres } from "../lib/queries";
import type { Movie } from "../types/movie";

interface Props {
  movie: Movie;
}

function MovieBillboard({ movie }: Props) {
  const { data } = useQuery(movieGenres.getAll);

  const genres = data
    ? movie.genre_ids.map((id) => data.genres.find(({ id: _id }) => id === _id))
    : [];

  console.log(data);

  return (
    <div className="h-full w-48 rounded-lg bg-white flex flex-col gap-2">
      <Suspense fallback="Loading">
        <img
          src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}.jpg`}
          className="w-full aspect-[2/3] object-cover rounded-t-lg"
        />
      </Suspense>
      <div className="p-2 text-wrap">
        <div></div>
        <div className="flex gap-2">
          <p>{movie.release_date.split("-")[0]}</p>·<p>{genres.join(", ")}</p>
        </div>
        <div className="">{movie.title}</div>
      </div>
    </div>
  );
}

export default MovieBillboard;
