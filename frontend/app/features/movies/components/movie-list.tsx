import type { Movie } from "@/features/movies/types/movie";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    <div className="flex gap-8 text-accent items-end">
      <h2 className="text-2xl font-bold h-fit">{title}</h2>
      <Link
        className="flex items-center justify-start hover:cursor-pointer"
        to={{ pathname: `/list/${title.toLowerCase()}` }}
      >
        <h3 className="text-md">See more</h3>
        <ChevronRight className="stroke-2 size-4 ml-1" />
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
    <div className="absolute w-full h-full z-50 text-white pointer-events-none">
      <div className="flex h-full items-start justify-between visible not-group-hover:invisible ease-in-out transition-all duration-100 pointer-events-none">
        {isRenderLeft ? (
          <div
            className="flex items-center h-full w-8 rounded-lg pointer-events-auto hover:cursor-pointer relative z-50"
            onClick={() => scrollBy(-scrollDistance)}
          >
            <div className="absolute size-full bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <ChevronRight
              className="z-2 rotate-180 stroke-2 size-6 pointer-events-auto text-muted-foreground hover:text-accent transition-colors cursor-pointer"
              aria-label="Scroll left"
            />
          </div>
        ) : (
          <div />
        )}
        {isRenderRight && (
          <div
            onClick={() => scrollBy(scrollDistance)}
            className="flex items-center h-full w-8 rounded-lg pointer-events-auto hover:cursor-pointer relative z-50"
          >
            <ChevronRight
              className="z-2 stroke-2 size-6 text-muted-foreground pointer-events-auto hover:text-accent transition-colors cursor-pointer"
              aria-label="Scroll right"
            />
            <div className="absolute size-full bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
};

function MovieList({ title, children }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollBy = (distance: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });

    setTimeout(() => {
      const el = scrollRef.current!;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }, SCROLL_TIMEOUT);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollState = () => {
      // console.log("Updating scroll state", el.scrollLeft);
      setCanScrollLeft(el.scrollLeft > SCROLL_LEFT_THRESHOLD);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    updateScrollState();

    el.addEventListener("scroll", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-2 py-4 px-8">
      {renderListTitle(title)}
      <div className="relative group">
        {renderSkipMovies({
          scrollBy,
          isRenderLeft: canScrollLeft,
          isRenderRight: canScrollRight,
        })}
        <div
          ref={scrollRef}
          className="flex gap-4 w-full h-full overflow-x-auto overflow-y-hidden relative"
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
