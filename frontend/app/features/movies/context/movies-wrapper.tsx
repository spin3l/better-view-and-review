import { createContext, useContext, type ReactNode } from "react";
import type { MovieGenres } from "../types/genres";

interface MoviesWrapperContextProps {
  movieGenres: MovieGenres;
}

const MoviesContext = createContext({} as MoviesWrapperContextProps);

interface MoviesContextProviderProps {
  movieGenres: MovieGenres;
  className?: string;
  children: ReactNode;
}

function MoviesWrapper({
  movieGenres,
  className,
  children,
}: MoviesContextProviderProps) {
  return (
    <MoviesContext.Provider value={{ movieGenres }}>
      <article className={className}>{children}</article>
    </MoviesContext.Provider>
  );
}

const useMoviesContext = () => useContext(MoviesContext);

export default MoviesWrapper;
export { useMoviesContext };
