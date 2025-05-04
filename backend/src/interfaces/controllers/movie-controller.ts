import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IMovieController } from "../../domain/controllers/IMovieController";
import { ISearchMovie } from "../../domain/use-cases/search/ISearchMovie";
import { IAddFavoriteMovie } from "../../domain/use-cases/favorites/IAddFavoriteMovie";
import { IRemoveFavoriteMovie } from "../../domain/use-cases/favorites/IRemoveFavoriteMovie";
import { IGetFavoriteMovies } from "../../domain/use-cases/favorites/IGetFavoriteMovies";

@injectable()
export class MovieController implements IMovieController {
  constructor(
    @inject("ISearchMovie") private searchMovies: ISearchMovie,
    @inject("IAddFavoriteMovie") private addFavoriteMovie: IAddFavoriteMovie,
    @inject("IRemoveFavoriteMovie") private removeFavoriteMovie: IRemoveFavoriteMovie,
    @inject("IGetFavoriteMovies") private getFavoriteMovies: IGetFavoriteMovies
  ) { }

  async search(req: Request, res: Response) {
    const title = req.query.t as string;
    const result = await this.searchMovies.execute(title, req.user._id);
    res.json(result);
  }

  async addFavorite(req: Request, res: Response) {
    const { imdbID } = req.body;
    await this.addFavoriteMovie.execute(req.user._id, imdbID);
    res.status(201).send();
  }

  async removeFavorite(req: Request, res: Response) {
    const { imdbID } = req.params;
    await this.removeFavoriteMovie.execute(req.user._id, imdbID);
    res.status(204).send();
  }

  async getFavorites(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;
    const { favorites, totalItems } = await this.getFavoriteMovies.execute(req.user._id, skip, limit);
    res.json({
      favorites,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      totalItems
    });
  }
}
