import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../../../domain/entities/IUser';

export type IUserDocument = IUser & Document;

const userSchema = new Schema<IUserDocument>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            next(error);
        } else {
            next(new Error('An unknown error occured while hashing the password!'));
        }
    }
});

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return bcrypt.compare(userPassword, this.password);
};

export default mongoose.model<IUserDocument>('User', userSchema);