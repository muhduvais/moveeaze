
const Pagination: React.FC<{
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}> = ({ currentPage, setCurrentPage, totalPages }) => {


    return (
        <div className="flex justify-center mt-8 mb-4 gap-2">
            <button
                onClick={() => setCurrentPage((curr: number) => Math.max(curr - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className={`px-4 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600 cursor-pointer'}`}
            >
                Previous
            </button>

            <div className="flex items-center px-4 text-gray-300">
                Page {currentPage} of {totalPages}
            </div>

            <button
                onClick={() => setCurrentPage((curr: number) => Math.min(curr + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className={`px-4 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600 cursor-pointer'}`}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination;