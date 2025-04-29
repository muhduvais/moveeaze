import { Request, Response } from "express";

export interface IMovieController {
  search(req: Request, res: Response): Promise<void>;
  addFavorite(req: Request, res: Response): Promise<void>;
  removeFavorite(req: Request, res: Response): Promise<void>;
  getFavorites(req: Request, res: Response): Promise<void>;
}