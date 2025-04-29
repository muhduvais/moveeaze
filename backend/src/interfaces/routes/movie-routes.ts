import { Router } from "express";
import { container } from '../../infrastructure/config/container';
import { IMovieController } from "../../domain/controllers/IMovieController";
import { protect } from "../middlewares/auth-middleware";

const movieRouter = Router();
const movieController = container.resolve<IMovieController>("IMovieController");

// movieRouter.use(protect);

movieRouter.get("/search", (req, res) => movieController.search(req, res));
movieRouter.post("/favorites", (req, res) => movieController.addFavorite(req, res));
movieRouter.delete("/favorites", (req, res) => movieController.removeFavorite(req, res));
movieRouter.get("/favorites/:userId", (req, res) => movieController.getFavorites(req, res));

export default movieRouter;