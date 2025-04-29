import { IMovieDetails } from '../entities/IMovie';

export interface IMovieDataProvider {
    fetchMovieDetails(title: string): Promise<IMovieDetails | []>;
    fetchMovieByImdbID(imdbID: string): Promise<IMovieDetails | null>;
}