import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Category from "../components/Category";
import { Link } from "react-router-dom";

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
                                <Link to={`/game/${game.code}`} className="mt-4 cursor-pointer bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
                                    Play
                                </Link>
                            </div>
                        ))}
                        {!filteredGames.length && <p className="text-red-100">There is no game with your keyword!</p>}
                    </div>
                </main>

                <Category
                    categories={categories}
                    handleSelectedCategory={setSelectedCategory}
                />
            </div>
        </>
    );
};

export default Games;
