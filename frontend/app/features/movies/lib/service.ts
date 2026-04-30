import { env } from "@/env";
import type { IMovieService } from "@/features/movies/interfaces/IMovieService";
import type { MovieGenres } from "@/features/movies/types/genres";
import type { Movie } from "@/features/movies/types/movie";
import type { MovieCategory } from "@/features/movies/types/movie-category";
import type { Paginated } from "@/types/pagination";

export class TMDBV3MovieService implements IMovieService {
  constructor(
    private readonly base: string = "https://api.themoviedb.org/3/",
    private readonly imageBase: string = "https://image.tmdb.org/t/p/",
    private readonly api_key: string = env.TMDB_API_KEY,
  ) {}

  async request<T>(
    path: string,
    options: RequestInit = {},
    params: Record<string, string | number | boolean> = {},
  ): Promise<T> {
    const url = new URL(`${this.base}${path}`);

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key].toString()),
    );

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        Authorization: `Bearer ${this.api_key}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`);
    }

    return response.json();
  }

  getMovie = (id: string): Promise<Movie> =>
    this.request(
      `movie/${id}`,
      {},
      {
        append_to_response: "videos",
      },
    );

  getMovies = (category?: MovieCategory): Promise<Paginated<Movie>> =>
    this.request(`movie/${category}`);

  getMovieGenres = (): Promise<MovieGenres> => this.request(`genre/movie/list`);

  getDiscover = (): Promise<Paginated<Movie>> => this.request("discover/movie");
  getMovieBillboardUrl = (imagePath: string, size: string): string =>
    `${this.imageBase}/${size}/${imagePath}`;
}

export const movieService = new TMDBV3MovieService();
