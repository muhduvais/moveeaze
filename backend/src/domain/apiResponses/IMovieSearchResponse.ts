import { IMovieDetails } from "../entities/IMovie";

export interface IMovieSearchResponse {
    movieDetails: IMovieDetails;
    isFavorite: boolean;
}