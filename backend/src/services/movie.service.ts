import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { IMovieDetails } from '../interfaces/movie.interface';
dotenv.config();

const API_URL = process.env.API_URL;
const FAVORITES_FILE = path.join(__dirname, '../public/favorites.json');

const getMovieDetails = async (title: string) => {
    try {
        const response = await axios.get(`${API_URL}&t=${title}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching the movie details');
    }
};

const checkIfFavorite = async (imdbID: string) => {
    try {
        const favorites = fs.existsSync(FAVORITES_FILE)
            ? JSON.parse(fs.readFileSync(FAVORITES_FILE, 'utf-8'))
            : [];

        const exists = favorites.filter((item: IMovieDetails) => item.imdbID === imdbID);

        return exists.length !== 0;
    } catch (error) {
        throw new Error('Error fetching the movie details');
    }
};

const addFavoriteMovie = async (movie: any) => {
    try {
        const data = fs.existsSync(FAVORITES_FILE)
            ? JSON.parse(fs.readFileSync(FAVORITES_FILE, 'utf-8'))
            : [];

        if (data.find((fav: any) => fav.imdbID === movie.imdbID)) {
            throw new Error('Movie already in favorites');
        }

        data.push(movie);
        fs.writeFileSync(FAVORITES_FILE, JSON.stringify(data, null, 2));
        return 'Movie added to favorites';
    } catch (err) {
	console.log('Error adding to favorites: ', err);
        throw new Error('Failed to add to favorites');
    }
};

const removeFavoriteMovie = async (imdbID: string) => {
    try {
        const data = fs.existsSync(FAVORITES_FILE)
            ? JSON.parse(fs.readFileSync(FAVORITES_FILE, 'utf-8'))
            : [];

        const filtered = data.filter((movie: any) => movie.imdbID !== imdbID);
        fs.writeFileSync(FAVORITES_FILE, JSON.stringify(filtered, null, 2));
        return 'Removed from favorites';
    } catch (err) {
        throw new Error('Failed to remove from favorites');
    }
};

const fetchFavorites = async (skip: number, limit: number) => {
    try {
        const data = fs.existsSync(FAVORITES_FILE)
            ? JSON.parse(fs.readFileSync(FAVORITES_FILE, 'utf-8'))
            : [];

        const paginatedData = data.reverse().slice(skip, skip + limit)

        return { paginatedData, totalItems: data.length };
    } catch (err) {
        throw new Error('Failed to fetch favorites');
    }
};

export default {
    getMovieDetails,
    checkIfFavorite,
    addFavoriteMovie,
    removeFavoriteMovie,
    fetchFavorites,
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
