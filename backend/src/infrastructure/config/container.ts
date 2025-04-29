import { container } from "tsyringe";
import { OmdbApiService } from "../services/omdbApi-service";
import { MovieRepository } from "../database/repositories/movieRepository";
import { IMovieRepository } from "../../domain/repositories/IMovieRepository";
import { IMovieDataProvider } from "../../domain/services/IMovieDataProvider";
import { IMovieController } from "../../domain/controllers/IMovieController";
import { MovieController } from "../../interfaces/controllers/movie-controller";
import { IAddFavoriteMovie } from "../../domain/use-cases/favorites/IAddFavoriteMovie";
import { AddFavoriteMovie } from "../../application/use-cases/favorites/addFavoriteMovie";
import { IGetFavoriteMovies } from "../../domain/use-cases/favorites/IGetFavoriteMovies";
import { GetFavoriteMovies } from "../../application/use-cases/favorites/getFavoriteMovies";
import { IRemoveFavoriteMovie } from "../../domain/use-cases/favorites/IRemoveFavoriteMovie";
import { RemoveFavoriteMovie } from "../../application/use-cases/favorites/removeFavoriteMovie";
import { ISearchMovie } from "../../domain/use-cases/search/ISearchMovie";
import { SearchMovie } from "../../application/use-cases/search/searchMovie";
import { ISignupUser } from "../../domain/use-cases/auth/ISignupUser";
import { ILoginUser } from "../../domain/use-cases/auth/ILoginUser";
import { IGetCurrentUser } from "../../domain/use-cases/auth/IGetCurrentUser";
import { SignupUser } from "../../application/use-cases/auth/signupUser";
import { LoginUser } from "../../application/use-cases/auth/loginUser";
import { GetCurrentUser } from "../../application/use-cases/auth/getCurrentUser";
import { IJwtService } from "../../domain/services/IJwtService";
import { JwtService } from "../../shared/services/jwtService";
import { IAuthController } from "../../domain/controllers/IAuthController";
import { AuthController } from "../../interfaces/controllers/auth-controller";

container.register<IMovieController>("IMovieController", { useClass: MovieController });
container.register<IAuthController>("IAuthController", { useClass: AuthController });

container.register<IMovieRepository>("IMovieRepository", { useClass: MovieRepository });

container.register<IAddFavoriteMovie>("IAddFavoriteMovie", { useClass: AddFavoriteMovie });
container.register<IGetFavoriteMovies>("IGetFavoriteMovies", { useClass: GetFavoriteMovies });
container.register<IRemoveFavoriteMovie>("IRemoveFavoriteMovie", { useClass: RemoveFavoriteMovie });
container.register<ISearchMovie>("ISearchMovie", { useClass: SearchMovie });

container.register<ISignupUser>("ISignupUser", { useClass: SignupUser });
container.register<ILoginUser>("ILoginUser", { useClass: LoginUser });
container.register<IGetCurrentUser>("IGetCurrentUser", { useClass: GetCurrentUser });

container.registerSingleton<IJwtService>("IJwtService", JwtService);
container.registerSingleton<IMovieDataProvider>("IMovieDataProvider", OmdbApiService);

export { container };