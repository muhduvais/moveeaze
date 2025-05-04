import { useState, useEffect } from 'react';
import { IFavoritesResponse } from '../interfaces/movieInterfaces';
import { movieService } from '../services/movie-service';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { IMovieDetails } from '../domain/models/IMovieDetails';

export const useFavorite = () => {
    const [favorites, setFavorites] = useState<IMovieDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { isAuthenticated } = useAuth();

    const fetchFavorites = async (page: number = 1) => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            const { data } = await movieService.getFavourites(page);
            setFavorites(data.favorites);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setTotalItems(data.totalItems);
        } catch (err) {
            console.error('Error fetching favorites:', err);
            toast.error('Failed to load favorites');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites(currentPage);
    }, [currentPage, isAuthenticated]);

    const removeFromFavorites = async (movieId: string) => {
        try {
            setFavorites(prevFavorites => prevFavorites.filter(movie => movie.imdbID !== movieId));

            await movieService.removeFavourite(movieId);
            toast.success('Movie removed from favorites!');

            if (favorites.length === 1 && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
            } else if (favorites.length === 1) {
                fetchFavorites(1);
            }
        } catch (err) {
            console.error('Error removing from favorites:', err);
            toast.error('Failed to remove movie from favorites');

            fetchFavorites(currentPage);
        }
    };

    return {
        favorites,
        loading,
        currentPage,
        totalPages,
        totalItems,
        setCurrentPage,
        removeFromFavorites,
    };
};
