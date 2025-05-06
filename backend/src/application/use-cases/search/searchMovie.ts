import { injectable, inject } from "tsyringe";
import { ISearchMovie } from "../../../domain/use-cases/search/ISearchMovie";
import { IMovieDataProvider } from "../../../domain/services/IMovieDataProvider";
import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { IMovieSearchResponse } from "../../../domain/apiResponses/IMovieSearchResponse";

@injectable()
export class SearchMovie implements ISearchMovie {
  constructor(
    @inject("IMovieDataProvider") private omdbService: IMovieDataProvider,
    @inject("IMovieRepository") private movieRepository: IMovieRepository
  ) { }

  async execute(title: string, userId: string): Promise<IMovieSearchResponse> {
    const movieDetails = await this.omdbService.fetchMovieDetails(title);
    const isFavorite = await this.movieRepository.checkIfFavorite(userId, movieDetails.imdbID);
    return { movieDetails, isFavorite };
  }
}
