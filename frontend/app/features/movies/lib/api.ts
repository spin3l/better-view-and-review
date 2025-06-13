import axios from "axios";
import type { Movie } from "@/features/movies/types/movie";

const api_key = process.env.TMDB_API_KEY;

console.log(api_key);

const TMDB_API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${api_key}`,
  },
});

export async function getRandomMovies(): Promise<Paginated<Movie>> {
  return TMDB_API.get("discover/movie").then(({ data }) => data);
}
