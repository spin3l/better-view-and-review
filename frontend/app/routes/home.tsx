import { getRandomMovies, getUpcoming } from "@/features/movies/lib/api";
import MainPage from "@/features/movies/pages/main-page";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "View and Review" },
    { name: "description", content: "Welcome to View and Review" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  return await Promise.all([getRandomMovies(), getUpcoming()]);
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <MainPage
      discover={loaderData[0].results}
      upcoming={loaderData[1].results}
    />
  );
}
