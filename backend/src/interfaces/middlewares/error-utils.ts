import { AppError } from "../../shared/errors/appError";

export const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

export const handleDuplicateFieldsDB = (err: any) => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value.`;
    return new AppError(message, 400);
};

export const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

export const handleJWTError = () =>
    new AppError('Invalid token. Please log in again.', 401);

export const handleJWTExpiredError = () =>
    new AppError('Your token has expired. Please log in again.', 401);
