"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const movie_routes_1 = __importDefault(require("./routes/movie.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT);
const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api', movie_routes_1.default);
app.use(error_middleware_1.handleError);
app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on ${SERVER_URL}`));
