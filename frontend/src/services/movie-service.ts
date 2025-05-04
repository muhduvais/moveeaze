import { IMovieService } from './interfaces/movieService-interface';
import { getMovieDetails, addFavorite, getFavorites, removeFavorite } from '../infrastructure/api/movie-api';

export const movieService: IMovieService = {

  async searchMovie(title: string) {
    return await getMovieDetails(title);
  },
  async getFavourites(page: number) {
    return await getFavorites(page);
  },
  async addFavourite(imdbID: string) {
    return await addFavorite(imdbID);
  },
  async removeFavourite(imdbID: string) {
    return await removeFavorite(imdbID);
  },
};

