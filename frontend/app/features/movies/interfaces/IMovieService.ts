import type { MovieGenres } from "@/features/movies/types/genres";
import type { Movie } from "@/features/movies/types/movie";
import type { MovieCategory } from "@/features/movies/types/movie-category";
import type { Paginated } from "@/types/pagination";

export interface IMovieService {
  getMovie(id: string): Promise<Movie | undefined>;
  getMovies(category?: MovieCategory): Promise<Paginated<Movie>>;
  getMovieGenres(): Promise<MovieGenres>;
  getDiscover(): Promise<Paginated<Movie>>;
  getMovieBillboardUrl(imagePath: string, size: string): string;
}
