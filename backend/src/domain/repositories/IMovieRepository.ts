import { IMovieDetails } from "../entities/IMovie";

export interface IMovieRepository {
  addFavorite(userId: string, imdbID: string): Promise<void>;
  removeFavorite(userId: string, imdbID: string): Promise<void>;
  getFavoriteMovies(userId: string): Promise<IMovieDetails[]>;
}
