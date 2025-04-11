"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const API_URL = process.env.API_URL;
const FAVORITES_FILE = path_1.default.join(__dirname, '../public/favorites.json');
const getMovieDetails = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${API_URL}&t=${title}`);
        return response.data;
    }
    catch (error) {
        throw new Error('Error fetching the movie details');
    }
});
const addFavoriteMovie = (movie) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = fs_1.default.existsSync(FAVORITES_FILE)
            ? JSON.parse(fs_1.default.readFileSync(FAVORITES_FILE, 'utf-8'))
            : [];
        if (data.find((fav) => fav.imdbID === movie.imdbID)) {
            throw new Error('Movie already in favorites');
        }
        data.push(movie);
        fs_1.default.writeFileSync(FAVORITES_FILE, JSON.stringify(data, null, 2));
        return 'Movie added to favorites';
    }
    catch (err) {
        throw new Error('Failed to add to favorites');
    }
});
const removeFavoriteMovie = (imdbID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = fs_1.default.existsSync(FAVORITES_FILE)
            ? JSON.parse(fs_1.default.readFileSync(FAVORITES_FILE, 'utf-8'))
            : [];
        const filtered = data.filter((movie) => movie.imdbID !== imdbID);
        fs_1.default.writeFileSync(FAVORITES_FILE, JSON.stringify(filtered, null, 2));
        return 'Removed from favorites';
    }
    catch (err) {
        throw new Error('Failed to remove from favorites');
    }
});
const fetchFavorites = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = fs_1.default.existsSync(FAVORITES_FILE)
            ? JSON.parse(fs_1.default.readFileSync(FAVORITES_FILE, 'utf-8'))
            : [];
        return data;
    }
    catch (err) {
        throw new Error('Failed to fetch favorites');
    }
});
exports.default = {
    getMovieDetails,
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
