import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Category from "../components/Category";
import GameList from "../components/GameList";
import Search from "../components/Search";

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
        const filteredByKeyword = game.name.toLowerCase().includes(search.toLowerCase()) || game.description.toLowerCase().includes(search.toLowerCase());
        const filteredByCategory = selectedCategory === null || game.categoryIds.includes(selectedCategory);
        return filteredByKeyword && filteredByCategory;
    });

    return (
        <>
            <Header
                player={getUserInfo().player}
                logoutUser={() => logout()}
            />
            <div className="p-6 bg-gray-900 text-white flex gap-6 items-center flex-col md:flex-row">
                <Search search={search}
                    handleSearch={setSearch} />

                <Category
                    categories={categories}
                    handleSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />
            </div>
            <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-900 text-white">
                <GameList games={filteredGames} />
            </div>
        </>
    );
};

export default Games;
