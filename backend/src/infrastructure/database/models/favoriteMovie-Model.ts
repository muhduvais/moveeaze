import mongoose, { Document, Schema, Model } from "mongoose";
import { IFavorite } from "../../../domain/entities/IFavorite";

export interface FavoriteMovieDocument extends IFavorite, Document { }

const favoriteMovieSchema = new Schema<FavoriteMovieDocument>({
  imdbID: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const FavoriteMovieModel: Model<FavoriteMovieDocument> = mongoose.model<FavoriteMovieDocument>(
  "FavoriteMovie",
  favoriteMovieSchema
);
