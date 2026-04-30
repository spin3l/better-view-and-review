import { movieService } from "@/features/movies/lib/service";
import type { Movie } from "@/features/movies/types/movie";
import { PlayIcon } from "lucide-react";
import { useState } from "react";

export const MovieShowcase = ({ movie }: { movie: Movie }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoKey = "kgv8jf_8dm0";

  return (
    <div className="bg-gray-200 w-[75%]">
      <div className="p-4">
        <h1 className="font-semibold text-4xl">{movie.title}</h1>
      </div>
      <div className="relative flex bg-black w-full aspect-video md:aspect-[21/9] overflow-hidden">
        <div className="hidden md:block w-1/4 h-full shrink-0">
          <img
            alt="Poster"
            src={movieService.getMovieBillboardUrl(movie.poster_path, "w342")}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex-1 h-full">
          {isPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full">
              <img
                alt="Backdrop"
                src={movieService.getMovieBillboardUrl(
                  movie.backdrop_path,
                  "w780",
                )}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsPlaying(true)}
                className="group absolute inset-0 flex justify-center items-center bg-black/40 hover:bg-black/20 transition"
              >
                <div className="flex justify-center items-center bg-white/20 backdrop-blur-md border border-white/40 rounded-full w-20 h-20 group-hover:scale-110 transition">
                  <PlayIcon className="w-10 h-10 text-white" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
