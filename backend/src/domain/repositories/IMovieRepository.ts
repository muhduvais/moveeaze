import { IFavoritesRepoResponse } from '../../infrastructure/database/repositories/movieRepository';

export interface IMovieRepository {
  addFavorite(userId: string, imdbID: string): Promise<void>;
  removeFavorite(userId: string, imdbID: string): Promise<void>;
  getFavoriteMovies(userId: string, skip: number, limit: number): Promise<IFavoritesRepoResponse>;
  checkIfFavorite(userId: string, imdbID: string): Promise<boolean>;
}
