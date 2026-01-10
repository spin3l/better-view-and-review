import { Container } from "inversify";
import * as tokens from "@/di/tokens";
import { TMDB_INSTANCE } from "@/features/tmdb/lib/service";
import { MovieService } from "@/features/movies/lib/service";

const container: Container = new Container();

container.bind(tokens.TMDB_API).toConstantValue(TMDB_INSTANCE);
container.bind(tokens.MOVIE_SERVICE).to(MovieService);

export { container };
