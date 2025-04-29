import mongoose from "mongoose";

const favoriteMovieSchema = new mongoose.Schema({
  imdbID: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const FavoriteMovieModel = mongoose.model("FavoriteMovie", favoriteMovieSchema);
