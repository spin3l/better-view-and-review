import type { Route } from "./+types/home";
import { MainPage } from "../main-page/MainPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "View and Review" },
    { name: "description", content: "Welcome to View and Review" },
  ];
}

export default function Home() {
  return <MainPage />;
}
