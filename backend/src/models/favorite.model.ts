import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
    imdbID: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
    {
        imdbID: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

favoriteSchema.index({ imdbID: 1, userId: 1 }, { unique: true });

export default mongoose.model<IFavorite>('Favorite', favoriteSchema);