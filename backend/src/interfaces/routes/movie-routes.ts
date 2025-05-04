import { Router } from "express";
import { container } from '../../infrastructure/config/container';
import { IMovieController } from "../../domain/controllers/IMovieController";
import { protect } from "../middlewares/auth-middleware";

const movieRouter = Router();
const movieController = container.resolve<IMovieController>("IMovieController");

movieRouter.use(protect);

movieRouter.get("/search", movieController.search.bind(movieController));
movieRouter.post("/favorites", movieController.addFavorite.bind(movieController));
movieRouter.delete("/favorites/:imdbID", movieController.removeFavorite.bind(movieController));
movieRouter.get("/favorites", movieController.getFavorites.bind(movieController));

export default movieRouter;