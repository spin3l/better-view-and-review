import { TMDB_API } from "@/di/tokens";
import type { IMovieService } from "@/features/movies/interfaces/IMovieService";
import type { MovieGenres } from "@/features/movies/types/genres";
import type { Movie } from "@/features/movies/types/movie";
import type { MovieCategory } from "@/features/movies/types/movie-category";
import type { Paginated } from "@/types/pagination";
import type { AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

@injectable()
export class MovieService implements IMovieService {
  constructor(
    @inject(TMDB_API)
    private readonly api: AxiosInstance
  ) {}

  getMovie = (id: string): Promise<Movie> =>
    this.api.get(`movie/${id}`).then(({ data }) => data);

  getMovies = (category?: MovieCategory): Promise<Paginated<Movie>> =>
    this.api.get(`movie/${category}`).then(({ data }) => data);

  getMovieGenres = (): Promise<MovieGenres> =>
    this.api.get(`genre/movie/list`).then(({ data }) => data);

  getDiscover = (): Promise<Paginated<Movie>> =>
    this.api.get("discover/movie").then(({ data }) => data);
}
