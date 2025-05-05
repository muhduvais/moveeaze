import axiosInstance from "../apiClient/axiosInstance";

export const getMovieDetails = async (title: string) => axiosInstance.get(`/api/movies/search`, { params: { t: title } });
export const getFavorites = async (page: number) => axiosInstance.get(`/api/movies/favorites`, { params: { page } });
export const addFavorite = async (imdbID: string) => axiosInstance.post(`/api/movies/favorites`, { imdbID });
export const removeFavorite = async (imdbID: string) => axiosInstance.delete(`/api/movies/favorites/${imdbID}`);