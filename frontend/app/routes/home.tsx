import { getRandomMovies } from "@/features/movies/lib/api";
import MainPage from "@/features/movies/pages/main-page";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "View and Review" },
    { name: "description", content: "Welcome to View and Review" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  return await getRandomMovies();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <MainPage movies={loaderData.results} />;
}
