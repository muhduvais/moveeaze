import { IFavoritesResponse } from "../../interfaces/movieInterfaces";

export interface IMovieService {
    searchMovie(title: string): Promise<any>;
    getFavourites(page: number): Promise<{ data: IFavoritesResponse }>;
    addFavourite(imdbID: string): Promise<any>;
    removeFavourite(imdbID: string): Promise<any>;
}