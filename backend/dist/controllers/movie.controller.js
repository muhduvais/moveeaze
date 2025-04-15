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
const movie_service_1 = __importDefault(require("../services/movie.service"));
const fetchMovieDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.params.title;
        if (!title)
            res.status(400).json({ message: 'Title is required!' });
        const movieDetails = yield movie_service_1.default.getMovieDetails(title);
        const isFavorite = yield movie_service_1.default.checkIfFavorite(movieDetails.imdbID);
        res.status(200).json({ movieDetails, isFavorite });
    }
    catch (error) {
        console.log('Error fetching movie details: ', error);
        res.status(500).json({ message: 'Failed to fetch movie details' });
    }
});
const addFavoriteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = req.body;
    try {
        const result = yield movie_service_1.default.addFavoriteMovie(movie);
        res.status(201).json({ message: result });
    }
    catch (err) {
        console.log('Error adding to favorites: ', err);
        res.status(500).json({ message: 'Failed to add to favorites' });
    }
});
const removeFavoriteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imdbID = req.params.imdbID;
    try {
        const result = yield movie_service_1.default.removeFavoriteMovie(imdbID);
        res.status(200).json({ message: result });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to remove from favorites' });
    }
});
const fetchFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 4;
        const skip = (page - 1) * limit;
        const { paginatedData, totalItems } = yield movie_service_1.default.fetchFavorites(skip, limit);
        res.status(200).json({
            favorites: paginatedData,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            totalItems,
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
});
exports.default = {
    fetchMovieDetails,
    addFavoriteMovie,
    removeFavoriteMovie,
    fetchFavorites,
};
