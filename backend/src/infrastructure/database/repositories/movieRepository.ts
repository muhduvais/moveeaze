import { IMovieRepository } from "../../../domain/repositories/IMovieRepository";
import { BaseRepository } from "./baseRepository";
import { FavoriteMovieModel } from "../models/favoriteMovie-Model";
import { OmdbApiService } from "../../services/omdbApi-service";
import { IMovieDetails } from "../../../domain/entities/IMovie";
import { injectable } from "tsyringe";
import axios from "axios";

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

  async getFavoriteMovies(userId: string, skip: number, limit: number) {
    const favorites = await FavoriteMovieModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await FavoriteMovieModel.countDocuments({ userId });

    // const movieDetails = await Promise.all(
    //   favorites.map(async (favorite) => {
    //     const response = await axios.get(`${process.env.API_URL}&i=${favorite.imdbID}`);
    //     return response.data;
    //   })
    // );

    const imdbIDs = favorites.map(f => f.imdbID);
    const movies = await Promise.all(imdbIDs.map(id => this.omdbService.fetchMovieByImdbID(id)));
    return { favorites: movies, totalItems };
  }

  async checkIfFavorite(userId: string, imdbID: string): Promise<boolean> {
    const favoriteMovie = await FavoriteMovieModel.findOne({ userId, imdbID });
    return !!favoriteMovie;
  }
}

