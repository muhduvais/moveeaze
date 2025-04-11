import express from 'express';
import movieController from '../controllers/movie.controller';

const router = express.Router();

router.get('/movies/:title', movieController.fetchMovieDetails);
router.get('/favorites', movieController.fetchFavorites);
router.post('/favorites', movieController.addFavoriteMovie);
router.delete('/favorites/:imdbID', movieController.removeFavoriteMovie);

export default router;