import { IMovieSearchResponse, IFavoritesResponse } from "../apiResponse/IMovieSearchResponse";

export interface IMovieService {
    searchMovie(title: string): Promise<IMovieSearchResponse>;
    getFavourites(page: number): Promise<IFavoritesResponse>;
    addFavourite(imdbID: string): Promise<any>;
    removeFavourite(imdbID: string): Promise<any>;
}