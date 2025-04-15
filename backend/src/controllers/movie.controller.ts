import { Request, Response } from 'express';
import movieService from '../services/movie.service';

const fetchMovieDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const title = req.params.title as string;
        if (!title) res.status(400).json({ message: 'Title is required!' });

        const movieDetails = await movieService.getMovieDetails(title);
        const isFavorite = await movieService.checkIfFavorite(movieDetails.imdbID);

        res.status(200).json({ movieDetails, isFavorite });
    } catch (error) {
        console.log('Error fetching movie details: ', error);
        res.status(500).json({ message: 'Failed to fetch movie details' });
    }
};

const addFavoriteMovie = async (req: Request, res: Response): Promise<void> => {
    const movie = req.body;
    try {
        const result = await movieService.addFavoriteMovie(movie);
        res.status(201).json({ message: result });
    } catch (err) {
	console.log('Error adding to favorites: ', err);
        res.status(500).json({ message: 'Failed to add to favorites' });
    }
};

const removeFavoriteMovie = async (req: Request, res: Response): Promise<void> => {
    const imdbID = req.params.imdbID;
    try {
        const result = await movieService.removeFavoriteMovie(imdbID);
        res.status(200).json({ message: result });
    } catch (err) {
        res.status(500).json({ message: 'Failed to remove from favorites' });
    }
};

const fetchFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 4;
        const skip = (page - 1) * limit;
        const { paginatedData, totalItems } = await movieService.fetchFavorites(skip, limit);
        res.status(200).json({
            favorites: paginatedData,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            totalItems,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
};

export default {
    fetchMovieDetails,
    addFavoriteMovie,
    removeFavoriteMovie,
    fetchFavorites,
};
