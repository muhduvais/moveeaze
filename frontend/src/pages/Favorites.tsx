import { Link } from 'react-router-dom';
import Ratings from '../components/Ratings';
import { useFavorite } from '../hooks/useFavorite';
import { useEffect } from 'react';
import { useTab } from '../contexts/TabContext';
import Pagination from '../components/Pagination';

const Favorites = () => {

  const { setCurrentTab } = useTab();

  useEffect(() => {
    setCurrentTab('favorites');
  }, []);

  const {
    favorites,
    loading,
    currentPage,
    totalPages,
    totalItems,
    setCurrentPage,
    removeFromFavorites,
  } = useFavorite();

  return (
    <div className='overflow-y-auto scrollbar-hide'>
      {loading && (
        <div className="flex justify-center my-12">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && favorites.length === 0 && (
        <div className="text-center my-12">
          <p className="text-xl text-gray-300 font-medium">No favorite movies yet</p>
          <p className="text-gray-400 mt-2">Add some movies to your favorites</p>
          <Link to="/search" className="mt-4 inline-block px-6 py-2 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-400 transition duration-300">
            Search Movies
          </Link>
        </div>
      )}

      {!loading && favorites.length > 0 && (
        <>
          <div className="mb-2 text-gray-300 text-sm">
            <p>{totalItems === 1 ? 'There is ' : 'There are '} <span className='font-bold'>{totalItems} {totalItems === 1 ? 'movie' : 'movies'}</span> in your favorites</p>
          </div>

          <div className="mt-4">
            {favorites.map((movie, index) => (
              <div
                key={movie.imdbID || index}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl mb-8"
              >
                <div className="lg:flex">
                  <div className="lg:w-1/3 flex justify-center lg:justify-start">
                    {movie.Poster && movie.Poster !== "N/A" ? (
                      <img
                        src={movie.Poster}
                        alt={`${movie.Title} poster`}
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
                      <h3 className="text-2xl font-bold text-white mr-4">{movie.Title}</h3>
                      {movie.imdbRating && (
                        <div className="flex items-center bg-gray-900 px-3 py-1 rounded-md text-yellow-300">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="font-bold">{movie.imdbRating}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block bg-gray-900 text-blue-300 px-3 py-1 rounded-md text-sm font-medium">
                        {movie.Year}
                      </span>
                      {movie.Runtime && movie.Runtime !== "N/A" && (
                        <span className="inline-block bg-gray-900 text-purple-300 px-3 py-1 rounded-md text-sm font-medium">
                          {movie.Runtime}
                        </span>
                      )}
                      {movie.Rated && movie.Rated !== "N/A" && (
                        <span className="inline-block bg-gray-900 text-red-300 px-3 py-1 rounded-md text-sm font-medium">
                          {movie.Rated}
                        </span>
                      )}
                    </div>

                    {movie.Plot && (
                      <p className="text-gray-300 mb-4 italic text-start">{movie.Plot}</p>
                    )}

                    {Ratings(movie.Ratings)}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-gray-300 mb-6 text-start">
                      {movie.Director && movie.Director !== "N/A" && (
                        <p><span className="font-semibold text-gray-500">Director:</span> {movie.Director}</p>
                      )}
                      {movie.Genre && movie.Genre !== "N/A" && (
                        <p><span className="font-semibold text-gray-500">Genre:</span> {movie.Genre}</p>
                      )}
                      {movie.Writer && movie.Writer !== "N/A" && (
                        <p><span className="font-semibold text-gray-500">Writers:</span> {movie.Writer}</p>
                      )}
                      {movie.Actors && movie.Actors !== "N/A" && (
                        <p><span className="font-semibold text-gray-500">Actors:</span> {movie.Actors}</p>
                      )}
                      {movie.Released && movie.Released !== "N/A" && (
                        <p><span className="font-semibold text-gray-500">Released:</span> {movie.Released}</p>
                      )}
                      {movie.Language && movie.Language !== "N/A" && (
                        <p><span className="font-semibold text-gray-500">Language:</span> {movie.Language}</p>
                      )}
                      {movie.Country && movie.Country !== "N/A" && (
                        <p><span className="font-semibold text-gray-500">Country:</span> {movie.Country}</p>
                      )}
                      {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                        <p><span className="font-semibold text-gray-500">Box Office:</span> {movie.BoxOffice}</p>
                      )}
                      {movie.Awards && movie.Awards !== "N/A" && (
                        <p className="md:col-span-2"><span className="font-semibold text-gray-500">Awards:</span> {movie.Awards}</p>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromFavorites(movie.imdbID)}
                      className="flex items-center justify-center px-4 py-2 bg-gray-900 border-2 border-gray-700 hover:border-red-900 
                          text-white text-sm font-medium rounded-lg
                          shadow-lg hover:shadow-xl w-full md:w-auto cursor-pointer"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 &&
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />}
        </>
      )}
    </div>
  );
};

export default Favorites;