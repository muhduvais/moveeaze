import { IMovieDetails } from "../IMovieDetails";

export interface IFavoritesResponse {
    favorites: IMovieDetails[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
}