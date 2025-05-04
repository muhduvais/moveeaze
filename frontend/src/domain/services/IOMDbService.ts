import { IMovieDetails } from "../models/IMovieDetails";

export interface IOMDbService {
  fetchMovie(title: string): Promise<IMovieDetails | null>;
}
