import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { injectable, inject } from "tsyringe";
import { IRemoveFavoriteMovie } from "../../../domain/use-cases/favorites/IRemoveFavoriteMovie";

@injectable()
export class RemoveFavoriteMovie implements IRemoveFavoriteMovie {
  constructor(
    @inject("IMovieRepository") private movieRepository: IMovieRepository
  ) {}

  async execute(userId: string, movieId: string): Promise<void> {
    return await this.movieRepository.removeFavorite(userId, movieId);
  }
}
