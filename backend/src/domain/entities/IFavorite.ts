import { Types } from "mongoose";

export interface IFavorite {
    imdbID: string;
    userId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}