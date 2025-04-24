import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError';
import User, { IUser } from '../models/user.model';

interface JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        let token: string | undefined;
        
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }
        
        if (!token) {
            return next(new AppError('You are not logged in. Please log in to get access.', 401));
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return next(new AppError('The user with this token no longer exists.', 401));
        }
        
        req.user = user;
        next();
    } catch (error) {
        next(new AppError('Authentication failed. Please log in again.', 401));
    }
};