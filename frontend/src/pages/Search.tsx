import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import axios from '../api/axiosInstance';
import { SiRottentomatoes } from 'react-icons/si';
import { SiMetacritic } from 'react-icons/si';
import { FaImdb } from 'react-icons/fa';
import { toast } from 'sonner';
import { IMovie, IMovieApiResponse, IRating } from '../interfaces/movieInterfaces';

const Search = () => {
    const [result, setResult] = useState<IMovie | null>(null);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [debouncedQuery] = useDebounce(query, 500);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!debouncedQuery.trim()) {
                setResult(null);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get<IMovieApiResponse>(`/api/movies/details/${debouncedQuery}`);

                const { movieDetails, isFavorite } = response.data;

                if (movieDetails) {
                    setResult(movieDetails);
                    setIsFavorite(isFavorite)
                } else {
                    setResult(null);
                }
            } catch (err) {
                console.error('Error searching movie:', err);
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
            const response = await axios.post('/api/movies/favorites', { imdbID });
            if (response.status === 201) {
                toast.success('Movie added to favorites!');
                setIsFavorite(true);
            } else {
                toast.error('Error adding movie to favorites!');
            }
        } catch (err) {
            console.error('Failed to add to favorites:', err);
        }
    };

    const removeFromFavorites = async (movieId: string) => {
        try {
            const response = await axios.delete(`/api/movies/favorites/${movieId}`);
            if (response.status === 200) {
                toast.success('Movie removed from favorites!');
                setIsFavorite(false);
            } else {
                toast.error('Error removing movie from favorites!')
            }
        } catch (err) {
            console.error('Failed to remove from favorites:', err);
        }
    };

    const renderRatings = (ratings: IRating[] | undefined) => {
        if (!ratings || ratings.length === 0) return null;

        return (
            <div className="flex flex-wrap gap-2 mb-4">
                {ratings.map((rating, index) => {

                    return (
                        <div
                            key={index}
                            className={`px-3 py-1 rounded-lg text-white text-sm font-medium flex items-center gap-1`}
                        >
                            {rating.Source === "Internet Movie Database" ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <FaImdb className={`text-yellow-500`} />
                                    <span>{rating.Value}</span>
                                </div>
                            ) : rating.Source === "Rotten Tomatoes" ? (
                                <div className='flex items-center justify-center gap-2'>
                                    <SiRottentomatoes className={`text-red-500`} />
                                    <span>{rating.Value}</span>
                                </div>
                            ) : (
                                <div className='flex items-center justify-center gap-2'>
                                    <SiMetacritic className={`text-yellow-500`} />
                                    <span>{rating.Value}</span>
                                </div>
                            )}
                        </div>
                    );

                })}
            </div>
        );
    };

    return (
        <>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    className="w-full border-2 border-gray-600 focus:border-gray-400 px-4 py-3 text-lg rounded-lg 
            font-medium bg-gray-800 text-white outline-none transition duration-300 shadow-lg"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center my-12">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {!loading && !result && debouncedQuery && (
                <div className="text-center my-12">
                    <p className="text-xl text-gray-300 font-medium">No movies found</p>
                    <p className="text-gray-400 mt-2">Try another search term</p>
                </div>
            )}

            {!loading && !result && !debouncedQuery && (
                <div className="text-center my-12">
                    <p className="text-xl text-gray-300 font-medium">Search for a movie above</p>
                    <p className="text-gray-400 mt-2">Results will appear here</p>
                </div>
            )}

            {!loading && result && (
                <div className="mt-8">
                    <div
                        className="bg-gray-800 rounded-xl overflow-hidden shadow-xl mb-8"
                    >
                        <div className="lg:flex">
                            <div className="lg:w-1/3 flex justify-center lg:justify-start">
                                {result.Poster && result.Poster !== "N/A" ? (
                                    <img
                                        src={result.Poster}
                                        alt={`${result.Title} poster`}
                                        className="object-cover h-96 w-full lg:w-auto lg:h-auto rounded-t-xl lg:rounded-none"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-96 w-full bg-gray-700 text-gray-400">
                                        No poster available
                                    </div>
                                )}
                            </div>

                            <div className="p-6 lg:w-2/3">
                                <div className="flex flex-wrap justify-between items-start mb-2">
                                    <h3 className="text-2xl font-bold text-white mr-4">{result.Title}</h3>
                                    {result.imdbRating && (
                                        <div className="flex items-center bg-gray-900 px-3 py-1 rounded-md text-yellow-300">
                                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                            <span className="font-bold">{result.imdbRating}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="inline-block bg-gray-900 text-blue-300 px-3 py-1 rounded-md text-sm font-medium">
                                        {result.Year}
                                    </span>
                                    {result.Runtime && result.Runtime !== "N/A" && (
                                        <span className="inline-block bg-gray-900 text-purple-300 px-3 py-1 rounded-md text-sm font-medium">
                                            {result.Runtime}
                                        </span>
                                    )}
                                    {result.Rated && result.Rated !== "N/A" && (
                                        <span className="inline-block bg-gray-900 text-red-300 px-3 py-1 rounded-md text-sm font-medium">
                                            {result.Rated}
                                        </span>
                                    )}
                                </div>

                                {result.Plot && (
                                    <p className="text-gray-300 mb-4 italic text-start">{result.Plot}</p>
                                )}

                                {renderRatings(result.Ratings)}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-gray-300 mb-6 text-start">
                                    {result.Director && result.Director !== "N/A" && (
                                        <p><span className="font-semibold text-gray-500">Director:</span> {result.Director}</p>
                                    )}
                                    {result.Genre && result.Genre !== "N/A" && (
                                        <p><span className="font-semibold text-gray-500">Genre:</span> {result.Genre}</p>
                                    )}
                                    {result.Writer && result.Writer !== "N/A" && (
                                        <p><span className="font-semibold text-gray-500">Writers:</span> {result.Writer}</p>
                                    )}
                                    {result.Actors && result.Actors !== "N/A" && (
                                        <p><span className="font-semibold text-gray-500">Actors:</span> {result.Actors}</p>
                                    )}
                                    {result.Released && result.Released !== "N/A" && (
                                        <p><span className="font-semibold text-gray-500">Released:</span> {result.Released}</p>
                                    )}
                                    {result.Language && result.Language !== "N/A" && (
                                        <p><span className="font-semibold text-gray-500">Language:</span> {result.Language}</p>
                                    )}
                                    {result.Country && result.Country !== "N/A" && (
                                        <p><span className="font-semibold text-gray-500">Country:</span> {result.Country}</p>
                                    )}
                                    {result.BoxOffice && result.BoxOffice !== "N/A" && (
                                        <p><span className="font-semibold text-gray-500">Box Office:</span> {result.BoxOffice}</p>
                                    )}
                                    {result.Awards && result.Awards !== "N/A" && (
                                        <p className="md:col-span-2"><span className="font-semibold text-gray-500">Awards:</span> {result.Awards}</p>
                                    )}
                                </div>

                                {isFavorite && <button
                                    onClick={() => removeFromFavorites(result.imdbID)}
                                    className="flex items-center justify-center px-4 py-2 bg-gray-900 text-sm border-2 border-red-900
                                            text-white font-medium rounded-lg hover:border-red-800 cursor-pointer transition duration-300 
                                            shadow-lg hover:shadow-xl w-full md:w-auto"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="red" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                                    </svg>
                                    Added to Favorites
                                </button>}

                                {!isFavorite && <button
                                    onClick={() => addToFavorites(result.imdbID)}
                                    className="flex items-center justify-center px-4 py-2 bg-gray-900 text-sm border-2 border-gray-700
                                            text-white font-medium rounded-lg hover:border-blue-900 cursor-pointer transition duration-300 
                                            shadow-lg hover:shadow-xl w-full md:w-auto"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                                    </svg>
                                    Add to Favorites
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;