import { IMovieDetails } from "../../../domain/entities/IMovie";
import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { injectable, inject } from "tsyringe";
import { IGetFavoriteMovies } from "../../../domain/use-cases/favorites/IGetFavoriteMovies";

@injectable()
export class GetFavoriteMovies implements IGetFavoriteMovies {
  constructor(
    @inject("IMovieRepository") private movieRepository: IMovieRepository
  ) {}

  async execute(userId: string, skip: number, limit: number): Promise<IMovieDetails[]> {
    return await this.movieRepository.getFavoriteMovies(userId, skip, limit);
  }
}
