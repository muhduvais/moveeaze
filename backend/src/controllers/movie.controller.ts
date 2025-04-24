import { Request, Response, NextFunction } from 'express';
import movieService from '../services/movie.service';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { IUser } from '../models/user.model';


const fetchMovieDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.params;

    if (!title) {
        return next(new AppError('Title is required', 400));
    }

    const movieDetails = await movieService.getMovieDetails(title);

    let isFavorite = false;

    if (req.user) {
        isFavorite = await movieService.checkIfFavorite(movieDetails.imdbID, req.user._id);
    }

    res.status(200).json({
        status: 'success',
        movieDetails,
        isFavorite
    });
});

const addFavoriteMovie = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { imdbID } = req.body;

    if (!imdbID) {
        return next(new AppError('IMDB ID is required', 400));
    }

    if (!req.user) {
        return next(new AppError('Authentication required', 401));
    }

    const message = await movieService.addFavoriteMovie(imdbID, req.user._id);

    res.status(201).json({
        status: 'success',
        message
    });
});

const removeFavoriteMovie = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { imdbID } = req.params;

    const user = (req as { user?: IUser }).user;

    if (!user) {
        return next(new AppError('Authentication required', 401));
    }

    await movieService.removeFavoriteMovie(imdbID, user._id);

    res.status(200).json({
        status: 'success',
        message: 'Movie removed from favorites'
    });
});

const fetchFavorites = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new AppError('Authentication required', 401));
    }

    const page = Number(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const { favorites, totalItems } = await movieService.fetchFavorites(req.user._id, skip, limit);

    res.status(200).json({
        status: 'success',
        data: {
            favorites,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            totalItems
        }
    });
});

export default {
    fetchMovieDetails,
    addFavoriteMovie,
    removeFavoriteMovie,
    fetchFavorites
};