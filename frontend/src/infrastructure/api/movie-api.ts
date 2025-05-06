
import { IFavoritesResponse, IMovieSearchResponse } from "../../domain/models/apiResponse/IMovieSearchResponse";
import axiosInstance from "../apiClient/axiosInstance";

export const getMovieDetails = async (title: string) => {
    const response = await axiosInstance.get<IMovieSearchResponse>(`/api/movies/search`, { params: { t: title } });
    return response.data;
};

export const getFavorites = async (page: number) => {
    const response = await axiosInstance.get<IFavoritesResponse>(`/api/movies/favorites`, { params: { page } });
    return response.data;
};

export const addFavorite = async (imdbID: string) => axiosInstance.post<void>(`/api/movies/favorites`, { imdbID });
export const removeFavorite = async (imdbID: string) => axiosInstance.delete<void>(`/api/movies/favorites/${imdbID}`);