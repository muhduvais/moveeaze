import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/database';
import dotenv from 'dotenv';
dotenv.config();
import movieRoutes from './interfaces/routes/movie-routes';
import authRoutes from './interfaces/routes/auth-routes';
import { handleError } from './interfaces/middlewares/error-middleware';

connectDB();

const app = express();

const PORT = parseInt(process.env.PORT as string) || 3000;
const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.use((req, res, next) => {
    res.status(404).json({ status: 'fail', message: 'Route not found' });
});

app.use(handleError);

app.listen(PORT, () => console.log(`Server running on ${SERVER_URL}`));

export default app;
