import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { injectable, inject } from "tsyringe";
import { IGetFavoriteMovies } from "../../../domain/use-cases/favorites/IGetFavoriteMovies";
import { IFavoritesRepoResponse } from "../../../infrastructure/database/repositories/movieRepository";

@injectable()
export class GetFavoriteMovies implements IGetFavoriteMovies {
  constructor(
    @inject("IMovieRepository") private movieRepository: IMovieRepository
  ) {}

  async execute(userId: string, skip: number, limit: number): Promise<IFavoritesRepoResponse> {
    return await this.movieRepository.getFavoriteMovies(userId, skip, limit);
  }
}
