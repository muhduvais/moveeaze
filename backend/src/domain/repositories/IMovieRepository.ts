import { IMovieDetails } from "../entities/IMovie";

export interface IMovieRepository {
  addFavorite(userId: string, imdbID: string): Promise<void>;
  removeFavorite(userId: string, imdbID: string): Promise<void>;
  getFavoriteMovies(userId: string, skip: number, limit: number): Promise<any>;
  checkIfFavorite(userId: string, imdbID: string): Promise<boolean>;
}
