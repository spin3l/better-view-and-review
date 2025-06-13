import type { Movie } from "@/features/movies/types/movie";

interface Props {
  title: string;
  movies: Movie[];
}

function MovieList({ title, movies }: Props) {
  return (
    <>
      <h3>{title}</h3>
      <div className="flex flex-col gap-4">
        {movies.map(({ title, description }) => (
          <div key={title} className="flex gap-2">
            <h4 className="font-bold">{title}</h4>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieList;
