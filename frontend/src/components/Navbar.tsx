import { useNavigate } from 'react-router-dom';
import { useTab } from '../contexts/TabContext';

const Navbar = () => {
    const { currentTab, setCurrentTab } = useTab();
    const navigate = useNavigate();

    const handleTabClick = (tab: 'search' | 'favorites') => {
        setCurrentTab(tab);
        navigate(`/${tab}`);
    };

    return (
        <div className="main-container flex items-center justify-between w-[60%] h-[55px] bg-gray-200 fixed top-2 px-3 py-2 rounded-md shadow-md outline outline-gray-300 z-10">
            <h2 className="text-xl font-bold">MoveEaze</h2>
            <ul className="flex items-center gap-x-2 font-semibold text-xl">
                <li
                    className={`border-2 rounded-md px-2 py-1 cursor-pointer ${currentTab === 'search' ? 'border-black' : 'border-gray-400'
                        }`}
                    onClick={() => handleTabClick('search')}
                >
                    Search
                </li>
                <li
                    className={`border-2 rounded-md px-2 py-1 cursor-pointer ${currentTab === 'favorites' ? 'border-black' : 'border-gray-400'
                        }`}
                    onClick={() => handleTabClick('favorites')}
                >
                    Favorites
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
