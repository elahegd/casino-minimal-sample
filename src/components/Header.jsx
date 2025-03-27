import React from 'react';
import Search from "../assets/search.svg";
import Cross from "../assets/cross.svg";
import Logout from "../assets/logout.svg";

export default function Header({ player, handleSearch, search, logoutUser }) {
    const clearSearch = () => {
        handleSearch("");
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-900 text-white">
            <main className="flex-1 p-6">
                <div className="flex gap-4">
                    <div>
                        <img className="rounded-full" src={player.avatar} alt={player.name} />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold">{player.name}</h4>
                        <span className="text-sm text-gray-300">{player.event}</span>
                    </div>
                </div>
                <button
                    onClick={logoutUser}
                    className="inline-flex items-center cursor-pointer gap-2 mt-4 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md"
                >
                    <img src={Logout} className="mr-1 w-4 h-4" alt="logout icon" /> Logout
                </button>
            </main>

            <aside className="p-6 md:size-max w-full md:order-last flex flex-col items-center">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pr-10 pl-4 py-2 border border-gray-300 text-gray-50 rounded-md focus:outline-none focus:ring-2 transition bg-gray-800"
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
                            <img src={Search} alt="search icon" className="w-6 h-6" />
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}
