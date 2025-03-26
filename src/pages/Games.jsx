import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const fetchGames = async () => {
    const { data } = await axios.get("http://localhost:3001/games");
    return data;
};

const fetchCategories = async () => {
    const { data } = await axios.get("http://localhost:3001/categories");
    return data;
};

const Games = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { getUserInfo, logout } = useAuth();

    const { data: games, isLoading: gamesLoading } = useQuery({
        queryKey: ["games"],
        queryFn: fetchGames,
    });

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    if (gamesLoading || categoriesLoading) return <p className="text-white">Loading...</p>;

    const filteredGames = games.filter(game => {
        const filteredByKeyword = game.name.toLowerCase().includes(search.toLowerCase());
        const filteredByCategory = selectedCategory === null || game.categoryIds.includes(selectedCategory);
        return filteredByKeyword && filteredByCategory;
    });

    return (
        <>
            <Header 
                player={getUserInfo().player}
                search={search}
                handleSearch={setSearch}
                logoutUser={() => logout()}
            />
            <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-900 text-white">
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-6">Available Games</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredGames.map((game, idx) => (
                            <div key={idx} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
                                <div className="w-100 h-40">
                                    <img className="img-responsive mb-4" src={game.icon} alt={game.name} />
                                </div>
                                <div className="text-center">
                                    <h2 className="text-lg font-semibold">{game.name}</h2>
                                    <p className="text-sm text-gray-300">{game.description}</p>
                                </div>
                                <button
                                    className="mt-4 cursor-pointer bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Play
                                </button>
                            </div>
                        ))}
                        {!filteredGames.length && <p className="text-red-100">There is no game with your keyword!</p>}
                    </div>
                </main>
                <aside className="p-6 md:size-max w-full md:order-last flex flex-col">
                    <h2 className="text-2xl font-bold mb-6">Categories</h2>
                    <nav className="space-y-4 w-full">
                        {categories.map(category => (
                            <h3
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className="block cursor-pointer py-2 px-4 hover:bg-gray-700 rounded">{category.name}</h3>
                        ))}
                    </nav>
                </aside>
            </div>
        </>
    );
};

export default Games;
