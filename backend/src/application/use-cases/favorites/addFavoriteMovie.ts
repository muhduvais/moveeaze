import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { injectable, inject } from "tsyringe";
import { IAddFavoriteMovie } from "../../../domain/use-cases/favorites/IAddFavoriteMovie";

@injectable()
export class AddFavoriteMovie implements IAddFavoriteMovie {
  constructor(
    @inject("IMovieRepository") private movieRepository: IMovieRepository
  ) {}

  async execute(userId: string, imdbID: string): Promise<void> {
    return await this.movieRepository.addFavorite(userId, imdbID);
  }
}
