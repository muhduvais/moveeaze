import { useState } from 'react';
import Ratings from '../components/Ratings';
import { IMovieDetails } from '../domain/models/IMovieDetails';
import { useMovie } from "../hooks/useMovie";
import loadingIcon from '../assets/loading.svg'

const MovieCard: React.FC<{ result: IMovieDetails, isFavorite: boolean }> = ({ result, isFavorite }) => {

    const [isMovieFavorite, setIsMovieFavorite] = useState<boolean>(isFavorite);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { addToFavorites, removeFromFavorites } = useMovie();

    const handleRemoveFromFavorites = async (imdbID: string) => {
        setIsLoading(true);
        try {
            await removeFromFavorites(imdbID);
            setIsMovieFavorite(false);
        } catch (error) {
            console.log('Error removing favorite!', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddToFavorites = async (imdbID: string) => {
        setIsLoading(true);
        try {
            await addToFavorites(imdbID);
            setIsMovieFavorite(true);
        } catch (error) {
            console.log('Error adding favorite!', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {result &&
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

                                {Ratings(result.Ratings)}

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

                                {isMovieFavorite && <button
                                    onClick={() => handleRemoveFromFavorites(result.imdbID)}
                                    className="flex items-center justify-center px-4 py-2 bg-gray-900 text-sm border-2 border-red-900
                                            text-white font-medium rounded-lg hover:border-red-800 cursor-pointer transition duration-300 
                                            shadow-lg hover:shadow-xl w-full md:w-auto"
                                >
                                    {isLoading && <img src={loadingIcon} alt="Loading..." className="w-4 h-4 animate-spin mr-2" />}
                                    {!isLoading && <svg className="w-5 h-5 mr-2" fill="red" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                                    </svg>
                                    }
                                    {isLoading ? 'Removing...' : 'Added to Favorites'}
                                </button>}

                                {!isMovieFavorite && <button
                                    onClick={() => handleAddToFavorites(result.imdbID)}
                                    className="flex items-center justify-center px-4 py-2 bg-gray-900 text-sm border-2 border-gray-700
                                            text-white font-medium rounded-lg hover:border-blue-900 cursor-pointer transition duration-300 
                                            shadow-lg hover:shadow-xl w-full md:w-auto"
                                >
                                    {isLoading && <img src={loadingIcon} alt="Loading..." className="w-4 h-4 animate-spin mr-2" />}
                                    {!isLoading && <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                                    </svg>}
                                    {isLoading ? 'Adding...' : 'Add to Favorites'}
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MovieCard;