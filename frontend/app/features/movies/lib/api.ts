import axios from "axios";
import type { Movie } from "@/features/movies/types/movie";
import type { Paginated } from "@/features/movies/types/pagination";
import type { MovieGenres } from "../types/genres";
import { env } from "@/env";

const TMDB_API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${env.TMDB_API_KEY}`,
  },
});

export async function getDiscoverMovies(): Promise<Paginated<Movie>> {
  return TMDB_API.get("discover/movie").then(({ data }) => data);
}

export async function getMovieGenres(): Promise<MovieGenres> {
  return TMDB_API.get(`genre/movie/list`).then(({ data }) => data);
}

export async function getUpcoming(): Promise<Paginated<Movie>> {
  return TMDB_API.get("movie/upcoming").then(({ data }) => data);
}
