import { injectable } from "tsyringe";
import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { BaseRepository } from "./baseRepository";
import { FavoriteMovieModel, FavoriteMovieDocument } from "../models/favoriteMovie-Model";
import { OmdbApiService } from "../../services/omdbApi-service";
import { IMovieDetails } from "../../../domain/entities/IMovie";

export interface IFavoritesRepoResponse {
  favorites: IMovieDetails[];
  totalItems: number;
}

@injectable()
export class MovieRepository extends BaseRepository<FavoriteMovieDocument> implements IMovieRepository {
  constructor(private omdbService: OmdbApiService) {
    super(FavoriteMovieModel);
  }

  async addFavorite(userId: string, imdbID: string): Promise<void> {
    await this.model.create({ userId, imdbID });
  }

  async removeFavorite(userId: string, imdbID: string): Promise<void> {
    await this.model.deleteOne({ userId, imdbID });
  }

  async getFavoriteMovies(userId: string, skip: number, limit: number): Promise<IFavoritesRepoResponse> {
    const favorites = await this.model
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    const totalItems = await this.model.countDocuments({ userId });

    const imdbIDs = favorites.map(f => f.imdbID);
    const movies = await Promise.all(imdbIDs.map(id => this.omdbService.fetchMovieByImdbID(id)));

    return { favorites: movies, totalItems };
  }

  async checkIfFavorite(userId: string, imdbID: string): Promise<boolean> {
    const favoriteMovie = await this.model.findOne({ userId, imdbID });
    return !!favoriteMovie;
  }
}
