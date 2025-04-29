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
  ) {}

  async search(req: Request, res: Response) {
    const title = req.query.t as string;
    const result = await this.searchMovies.execute(title);
    res.json(result);
  }

  async addFavorite(req: Request, res: Response) {
    const { imdbID, userId } = req.body;
    await this.addFavoriteMovie.execute(userId, imdbID);
    res.status(201).send();
  }

  async removeFavorite(req: Request, res: Response) {
    const { imdbID, userId } = req.body;
    await this.removeFavoriteMovie.execute(userId, imdbID);
    res.status(204).send();
  }

  async getFavorites(req: Request, res: Response) {
    const userId = req.params.userId;
    const movies = await this.getFavoriteMovies.execute(userId);
    res.json(movies);
  }
}
