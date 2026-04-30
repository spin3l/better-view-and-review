import type { Movie } from "@/features/movies/types/movie";
import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import MovieBillboard from "./movie-billboard";

const SCROLL_DISTANCE = 600;
const SCROLL_LEFT_THRESHOLD = 150;
const SCROLL_TIMEOUT = 300;

interface Props {
  title: string;
  children: Movie[];
}

const renderListTitle = (title: string) => {
  return (
    <div className="flex items-end gap-8 text-gray-900">
      <h2 className="h-fit font-bold text-2xl">{title}</h2>
      <Link
        className="flex justify-start items-center hover:cursor-pointer"
        to={{ pathname: `/list/${title.toLowerCase()}` }}
      >
        <h3 className="text-md">See more</h3>
        <ChevronRight className="stroke-2 ml-1 size-4" />
      </Link>
    </div>
  );
};

interface SkipMoviesProps {
  scrollBy: (distance: number) => void;
  scrollDistance?: number;
  isRenderLeft?: boolean;
  isRenderRight?: boolean;
}

const renderSkipMovies = ({
  scrollBy,
  scrollDistance = SCROLL_DISTANCE,
  isRenderLeft = true,
  isRenderRight = true,
}: SkipMoviesProps) => {
  return (
    <div className="z-50 absolute w-full h-full text-white pointer-events-none">
      <div className="not-group-hover:invisible visible flex justify-between items-start h-full transition-all duration-100 ease-in-out pointer-events-none">
        {isRenderLeft ? (
          <div
            className="z-50 relative flex items-center rounded-lg w-8 h-full hover:cursor-pointer pointer-events-auto"
            onClick={() => scrollBy(-scrollDistance)}
          >
            <div className="absolute bg-gradient-to-r from-black to-transparent size-full pointer-events-none" />
            <ChevronRight
              className="z-2 stroke-2 size-6 text-muted-foreground hover:text-accent rotate-180 transition-colors cursor-pointer pointer-events-auto"
              aria-label="Scroll left"
            />
          </div>
        ) : (
          <div />
        )}
        {isRenderRight && (
          <div
            onClick={() => scrollBy(scrollDistance)}
            className="z-50 relative flex items-center rounded-lg w-8 h-full hover:cursor-pointer pointer-events-auto"
          >
            <ChevronRight
              className="z-2 stroke-2 size-6 text-muted-foreground hover:text-accent transition-colors cursor-pointer pointer-events-auto"
              aria-label="Scroll right"
            />
            <div className="absolute bg-gradient-to-l from-black to-transparent size-full pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
};

function MovieList({ title, children }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollState = () => {
      setCanScrollLeft(el.scrollLeft > SCROLL_LEFT_THRESHOLD);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    updateScrollState();

    el.addEventListener("scroll", updateScrollState);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      el.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  const scrollBy = useCallback((distance: number) => {
    if (!scrollRef.current) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
    timeoutRef.current = setTimeout(() => {
      const el = scrollRef.current!;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }, SCROLL_TIMEOUT);
  }, []);

  return (
    <div className="flex flex-col gap-y-2 px-8 py-4">
      {renderListTitle(title)}
      <div className="group relative">
        {renderSkipMovies({
          scrollBy,
          isRenderLeft: canScrollLeft,
          isRenderRight: canScrollRight,
        })}
        <div
          ref={scrollRef}
          className="relative flex gap-4 w-full h-full overflow-x-auto"
        >
          {children.map((movie, index) => (
            <div key={index} className="flex-shrink-0 w-64 h-full">
              <MovieBillboard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
