import React from "react";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

const fetchGames = async () => {
    const { data } = await axios.get("http://localhost:3001/games");
    return data;
};

const fetchCategories = async () => {
    const { data } = await axios.get("http://localhost:3001/categories");
    return data;
};

const Games = () => {
    const { data: games, isLoading: gamesLoading } = useQuery({
        queryKey: ["games"],
        queryFn: fetchGames,
    });

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    if (gamesLoading || categoriesLoading) return <p className="text-white">Loading...</p>;
    console.log('games', categories)
    return (
        <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-900 text-white">
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-6">Available Games</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {games.map((game, idx) => (
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
                </div>
            </main>
            <aside className="p-6 md:size-max w-full md:order-last flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6">Categories</h2>
                <nav className="space-y-4 w-full">
                    {categories.map(category => (
                        <h3 key={category.id} className="block cursor-pointer py-2 px-4 hover:bg-gray-700 rounded">{category.name}</h3>
                    ))}
                </nav>
            </aside>
        </div>
    );
};

export default Games;
