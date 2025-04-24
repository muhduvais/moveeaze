import axios from 'axios';
import { IMovieDetails } from '../interfaces/movie.interface';
import Favorite from '../models/favorite.model';
import { AppError } from '../utils/appError';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL;

const getMovieDetails = async (title: string): Promise<IMovieDetails | null> => {
    try {
        const response = await axios.get(`${API_URL}&t=${title}`);
        
        if (response.data.Response === 'False') {
            return null;
        }
        
        return response.data;
    } catch (error: any) {
        console.log('Error: ', error)
        if (error instanceof AppError) throw error;
        throw new AppError('Failed to fetch movie details', 500);
    }
};

const checkIfFavorite = async (imdbID: string, userId: string): Promise<boolean> => {
    try {
        const favorite = await Favorite.findOne({ imdbID, userId });
        return !!favorite;
    } catch (error) {
        throw new AppError('Failed to check favorite status', 500);
    }
};

const addFavoriteMovie = async (imdbID: string, userId: string): Promise<string> => {
    try {
        const existingFavorite = await Favorite.findOne({ imdbID, userId });
        
        if (existingFavorite) {
            throw new AppError('Movie is already in favorites', 400);
        }
        
        await Favorite.create({ imdbID, userId });
        return 'Movie added to favorites';
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        if (error.code === 11000) {
            throw new AppError('Movie is already in favorites', 400);
        }
        throw new AppError('Failed to add movie to favorites', 500);
    }
};

const removeFavoriteMovie = async (imdbID: string, userId: string): Promise<boolean> => {
    try {
        const result = await Favorite.findOneAndDelete({ imdbID, userId });
        
        if (!result) {
            throw new AppError('Movie not found in favorites', 404);
        }
        
        return true;
    } catch (error: any) {
        if (error instanceof AppError) throw error;
        throw new AppError('Failed to remove movie from favorites', 500);
    }
};

const fetchFavorites = async (userId: string, skip: number, limit: number) => {
    try {
        const favorites = await Favorite.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const totalItems = await Favorite.countDocuments({ userId });
        
        const movieDetails = await Promise.all(
            favorites.map(async (favorite) => {
                const response = await axios.get(`${API_URL}&i=${favorite.imdbID}`);
                return response.data;
            })
        );
        
        return { favorites: movieDetails, totalItems };
    } catch (error) {
        throw new AppError('Failed to fetch favorites', 500);
    }
};

export default {
    getMovieDetails,
    checkIfFavorite,
    addFavoriteMovie,
    removeFavoriteMovie,
    fetchFavorites
};

// Example response

// {
//     "movieDetails": {
//         "Title": "Blade",
//         "Year": "1998",
//         "Rated": "R",
//         "Released": "21 Aug 1998",
//         "Runtime": "120 min",
//         "Genre": "Action, Horror, Sci-Fi",
//         "Director": "Stephen Norrington",
//         "Writer": "David S. Goyer",
//         "Actors": "Wesley Snipes, Stephen Dorff, Kris Kristofferson",
//         "Plot": "A half-vampire, half-mortal man becomes a protector of the mortal race, while slaying evil vampires.",
//         "Language": "English, Russian, Serbian",
//         "Country": "United States",
//         "Awards": "5 wins & 11 nominations total",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BNzAzMmY3OWMtNDgyMS00Y2U4LTlmM2UtY2YwMmM0MDI5ODJmXkEyXkFqcGc@._V1_SX300.jpg",
//         "Ratings": [
//             {
//                 "Source": "Internet Movie Database",
//                 "Value": "7.1/10"
//             },
//             {
//                 "Source": "Rotten Tomatoes",
//                 "Value": "58%"
//             },
//             {
//                 "Source": "Metacritic",
//                 "Value": "47/100"
//             }
//         ],
//         "Metascore": "47",
//         "imdbRating": "7.1",
//         "imdbVotes": "315,321",
//         "imdbID": "tt0120611",
//         "Type": "movie",
//         "DVD": "N/A",
//         "BoxOffice": "$70,087,718",
//         "Production": "N/A",
//         "Website": "N/A",
//         "Response": "True"
//     }
// }
