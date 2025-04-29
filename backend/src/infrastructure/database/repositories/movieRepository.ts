import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { BaseRepository } from "./baseRepository";
import { FavoriteMovieModel } from "../models/favoriteMovie-Model";
import { OmdbApiService } from "../../services/omdbApi-service";
import { IMovieDetails } from "../../../domain/entities/IMovie";
import { injectable } from "tsyringe";

@injectable()
export class MovieRepository extends BaseRepository<IMovieDetails> implements IMovieRepository {
  constructor(private omdbService: OmdbApiService) {
    super(FavoriteMovieModel);
  }

  async addFavorite(userId: string, imdbID: string): Promise<void> {
    await FavoriteMovieModel.create({ userId, imdbID });
  }

  async removeFavorite(userId: string, imdbID: string): Promise<void> {
    await FavoriteMovieModel.deleteOne({ userId, imdbID });
  }

  async getFavoriteMovies(userId: string): Promise<IMovieDetails[]> {
    const favorites = await FavoriteMovieModel.find({ userId });
    const imdbIDs = favorites.map(f => f.imdbID);
    const movies = await Promise.all(imdbIDs.map(id => this.omdbService.fetchMovieByImdbID(id)));
    return movies;
  }
}

