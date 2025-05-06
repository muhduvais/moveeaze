import { IMovieService } from '../domain/models/service/IMovieService';
import { getMovieDetails, addFavorite, getFavorites, removeFavorite } from '../infrastructure/api/movie-api';
import { IMovieSearchResponse, IFavoritesResponse } from '../domain/models/apiResponse/IMovieSearchResponse';

export const movieService: IMovieService = {

  async searchMovie(title: string): Promise<IMovieSearchResponse> {
    return await getMovieDetails(title);
  },
  async getFavourites(page: number): Promise<IFavoritesResponse> {
    return await getFavorites(page);
  },
  async addFavourite(imdbID: string) {
    return await addFavorite(imdbID);
  },
  async removeFavourite(imdbID: string) {
    return await removeFavorite(imdbID);
  },
};

