import { MovieShowcase } from "@/features/movies/components/movie-showcase";
import { movieService } from "@/features/movies/lib/service";
import type { Route } from "./+types/movie";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const movieId = url.searchParams.get("movie");

  if (!movieId) {
    throw new Response("Invalid movie ID", { status: 400 });
  }

  const movie = await movieService.getMovie(movieId);

  if (!movie) {
    throw new Response("Not Found", { status: 404 });
  }

  return { movie };
}

export function meta({ matches }: Route.MetaArgs) {
  const routeMatch = matches[matches.length - 1];

  const loaderData =
    routeMatch?.loaderData as Route.ComponentProps["loaderData"];

  const movieName = loaderData?.movie?.name || "Movie Not Found";

  return [
    { title: `${movieName} | View and Review` },
    { name: "description", content: `Viewing ${movieName}` },
  ];
}

export default function Movie({ loaderData }: Route.ComponentProps) {
  return <MovieShowcase movie={loaderData.movie} />;
}
