import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import movieRoutes from './routes/movie.routes';
import authRoutes from './routes/auth.routes';
import { handleError } from './middlewares/error.middleware';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

connectDB();

const app = express();

// Constants
const PORT = parseInt(process.env.PORT as string) || 3000;
const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;

// Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Error handling middleware
app.use(handleError);

app.listen(PORT, () => console.log(`Server running on ${SERVER_URL}`));

export default app;