import { IFavoritesRepoResponse } from "../../../infrastructure/database/repositories/movieRepository";

export interface IGetFavoriteMovies {
    execute(userId: string, skip: number, limit: number): Promise<IFavoritesRepoResponse>;
}
