import { IMovieDetails } from "../entities/IMovie";

export interface IFavoritesResponse {
    favorites: IMovieDetails[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
}