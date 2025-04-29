import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ArrowLeft from "../assets/arrow-left.svg";

const fetchGame = async (gameCode) => {
  const { data } = await axios.get(`http://localhost:3001/games/${gameCode}`);
  return data;
};

const fetchCategories = async () => {
  const { data } = await axios.get("http://localhost:3001/categories");
  return data;
};

export default function GamePlay() {
  const { gameCode } = useParams();
  const navigate = useNavigate();

  const { data: game, isLoading: gameLoading } = useQuery({
    queryKey: ["game", gameCode],
    queryFn: () => fetchGame(gameCode),
    enabled: !!gameCode,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleGoBack = () => {
    navigate("/games");
  };

  if (gameLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-darkblue text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (!game || !categories) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-darkblue text-white">
        <p>Game not found.</p>
      </div>
    );
  }

  const categoryNames = game.categoryIds
    .map((id) => categories.find((cat) => cat.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="p-6 bg-[#0e1e2e] text-white min-h-screen font-sans">
      <button
        data-testid="back-to-games-btn"
        className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full shadow transition"
        onClick={handleGoBack}
      >
        <img src={ArrowLeft} alt="Back" className="w-4 h-4" />
        Back to Games
      </button>

      <div className="mt-6 rounded-2xl bg-[#152c45] p-6 shadow-lg border border-green-600">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <img
            src={game.icon}
            alt={game.name}
            className="w-full max-w-sm rounded-xl shadow-md border border-white"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-green-400 mb-4">
              {game.name}
            </h1>
            <p className="text-lg text-white leading-relaxed">{game.description}</p>
            <div className="mt-4">
              <p className="text-sm text-green-300 uppercase">Categories:</p>
              <ul className="list-disc ml-6 text-white">
                {categoryNames.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
