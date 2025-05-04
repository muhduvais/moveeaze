import axiosInstance from "../apiClient/axiosInstance";

export const getMovieDetails = async (title: string) => axiosInstance.get(`/movies/search`, { params: { t: title } });
export const getFavorites = async (page: number) => axiosInstance.get(`/movies/favorites`, { params: { page } });
export const addFavorite = async (imdbID: string) => axiosInstance.post(`/movies/favorites`, { imdbID });
export const removeFavorite = async (imdbID: string) => axiosInstance.delete(`/movies/favorites/${imdbID}`);