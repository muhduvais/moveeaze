import { IMovieDetails } from "../../entities/IMovie";

export interface IGetFavoriteMovies {
    execute(userId: string): Promise<IMovieDetails[]>;
}
