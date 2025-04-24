import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/user.model';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

const signToken = (id: string): string => {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'];

    return jwt.sign(
        { id },
        jwtSecret,
        { expiresIn: jwtExpiresIn }
    );
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
    const token = signToken(user._id);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError('Email already in use', 400));
    }

    const newUser = await User.create({
        name,
        email,
        password
    });

    createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    createSendToken(user, 200, res);
});

export const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        }
    });
});