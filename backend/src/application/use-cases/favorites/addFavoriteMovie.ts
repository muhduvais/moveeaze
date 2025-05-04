import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { injectable, inject } from "tsyringe";
import { IAddFavoriteMovie } from "../../../domain/use-cases/favorites/IAddFavoriteMovie";
import { AppError } from "../../../shared/errors/appError";

@injectable()
export class AddFavoriteMovie implements IAddFavoriteMovie {
  constructor(
    @inject("IMovieRepository") private movieRepository: IMovieRepository
  ) {}

  async execute(userId: string, imdbID: string): Promise<void> {
    const isFavorite = await this.movieRepository.checkIfFavorite(userId, imdbID);
    if (!isFavorite) return await this.movieRepository.addFavorite(userId, imdbID);
    throw new AppError('Already in favorites', 409);
  }
}
