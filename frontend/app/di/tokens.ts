import type { IMovieService } from "@/features/movies/interfaces/IMovieService";
import type { AxiosInstance } from "axios";
import type { ServiceIdentifier } from "inversify";

const TMDB_API: ServiceIdentifier<AxiosInstance> = Symbol.for("tmdbApi");
const MOVIE_SERVICE: ServiceIdentifier<IMovieService> =
  Symbol.for("movieService");

export { MOVIE_SERVICE, TMDB_API };
