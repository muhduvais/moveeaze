import { SiRottentomatoes } from 'react-icons/si';
import { SiMetacritic } from 'react-icons/si';
import { FaImdb } from 'react-icons/fa';
import { IRating } from '../interfaces/movieInterfaces';

const Ratings = (ratings: IRating[] | undefined) => {
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

export default Ratings;