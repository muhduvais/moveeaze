import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { movieService } from '../services/movie-service';
import { toast } from 'sonner';
import { IMovieDetails } from '../domain/models/IMovieDetails';

export const useMovie = () => {
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery] = useDebounce(query, 500);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<IMovieDetails | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!debouncedQuery.trim()) {
                setResult(null);
                return;
            }

            setLoading(true);
            try {
                const { movieDetails, isFavorite } = await movieService.searchMovie(debouncedQuery);
                
                if (movieDetails) {
                    setResult(movieDetails);
                    setIsFavorite(isFavorite);
                } else {
                    setResult(null);
                }
            } catch (error) {
                console.error('Error searching movie:', error);
                setResult(null);
            } finally {
                setLoading(false);
            }
        };

        if (debouncedQuery) {
            fetchMovieDetails();
        }
    }, [debouncedQuery]);

    const addToFavorites = async (imdbID: string) => {
        try {
            const response = await movieService.addFavourite(imdbID);
            if (response.status === 201) {
                toast.success('Movie added to favorites!');
                setIsFavorite(true);
            } else {
                toast.error('Error adding movie to favorites!');
            }
        } catch (error) {
            console.error('Failed to add to favorites:', error);
        }
    };

    const removeFromFavorites = async (movieId: string) => {
        try {
            const response = await movieService.removeFavourite(movieId);
            if (response.status === 204) {
                toast.success('Movie removed from favorites!');
                setIsFavorite(false);
            } else {
                toast.error('Error removing movie from favorites!');
            }
        } catch (error) {
            console.error('Failed to remove from favorites:', error);
        }
    };

    return {
        query,
        setQuery,
        result,
        debouncedQuery,
        loading,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
    };
};
