"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_controller_1 = __importDefault(require("../controllers/movie.controller"));
const router = express_1.default.Router();
router.get('/movies/:title', movie_controller_1.default.fetchMovieDetails);
router.get('/favorites', movie_controller_1.default.fetchFavorites);
router.post('/favorites', movie_controller_1.default.addFavoriteMovie);
router.delete('/favorites/:imdbID', movie_controller_1.default.removeFavoriteMovie);
exports.default = router;
