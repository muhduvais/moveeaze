import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movieRoutes from './routes/movie.routes';
import { handleError } from './middlewares/error.middleware';

dotenv.config();

const PORT = parseInt(process.env.PORT as string);
const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cors({
    origin: CLIENT_URL,
}));

app.use(express.json());

app.use('/api', movieRoutes);

app.use(handleError);

app.listen(PORT, () => console.log(`Server listening on ${SERVER_URL}`))