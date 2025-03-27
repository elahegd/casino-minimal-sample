import React from 'react';
import SearchIcon from "../assets/search.svg";
import Cross from "../assets/cross.svg";

export default function Search({ handleSearch, search }) {
    const clearSearch = () => {
        handleSearch("");
    };

    return (
        <div className="relative w-full md:flex-1">
            <input
                type="text"
                placeholder="Search games..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full relative pr-10 pl-4 py-2 border border-gray-300 text-gray-50 rounded-md focus:outline-none focus:ring-2 transition bg-gray-800"
            />
            {search ? (
                <button
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    <img src={Cross} alt="clear search" className="w-6 h-6 cursor-pointer" />
                </button>
            ) : (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <img src={SearchIcon} alt="search icon" className="w-6 h-6" />
                </div>
            )}
        </div>
    )
}
