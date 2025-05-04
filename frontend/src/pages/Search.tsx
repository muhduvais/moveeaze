import { useEffect } from 'react';
import { useMovie } from '../hooks/useMovie';
import { useTab } from '../contexts/TabContext';
import MovieCard from '../components/MovieCard';

const Search = () => {

    const { setCurrentTab } = useTab();

    useEffect(() => {
        setCurrentTab('search');
    }, []);

    const {
        query,
        setQuery,
        result,
        debouncedQuery,
        loading,
    } = useMovie();

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

            {!loading && result && <MovieCard result={result} />}
        </>
    );
};

export default Search;