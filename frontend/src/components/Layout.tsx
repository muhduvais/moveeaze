import { Link, Outlet } from 'react-router-dom';
import { useTab } from '../contexts/TabContext';

const Layout: React.FC = () => {

  const { currentTab, setCurrentTab } = useTab();

  return (
    <div className="w-full max-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <div className="w-[70%] max-w-[1200px]">
        <div>

          <div className="w-full bg-gray-900 max-h-[90vh] px-4 md:px-6 py-8 rounded-md overflow-y-auto scrollbar-hide">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-white">
                  {currentTab === 'search' ? 'Search for ' : 'Your Favorite ' }<span className='text-yellow-400 text-2xl'>MoveEaze</span>
                </h2>
                <div className="flex rounded-lg overflow-hidden">
                  <Link to="/search" className={`px-4 py-2 ${currentTab === 'search' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 hover:bg-gray-700 text-white'} font-semibold font-medium`}
                    onClick={() => setCurrentTab('search')}>
                    Search
                  </Link>
                  <Link to="/favorites" className={`px-4 py-2 ${currentTab === 'favorites' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 hover:bg-gray-700 text-white'} font-semibold transition duration-200`}
                    onClick={() => setCurrentTab('favorites')}>
                    Favorites
                  </Link>
                </div>
              </div>

              <Outlet />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Layout;