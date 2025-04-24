import express from 'express';
import movieController from '../controllers/movie.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/details/:title', movieController.fetchMovieDetails);

router.use(protect);
router.get('/favorites', movieController.fetchFavorites);
router.post('/favorites', movieController.addFavoriteMovie);
router.delete('/favorites/:imdbID', movieController.removeFavoriteMovie);

export default router;