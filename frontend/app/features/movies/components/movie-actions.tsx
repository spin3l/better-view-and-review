import { Bookmark, Heart } from "lucide-react";
import MovieBillboardAction from "./movie-billboard-action";

export const MovieActions = () => {
  return (
    <div className="absolute flex gap-2 items-center justify-center right-0 bottom-0 translate-x-2 translate-y-4 h-8 w-32 z-1">
      <MovieBillboardAction
        icon={<Bookmark />}
        onClick={() => console.log("Bookmarked")}
      />
      <MovieBillboardAction
        icon={<Heart />}
        onClick={() => console.log("Liked")}
      />
    </div>
  );
};
