import React from 'react';
import { Link } from "react-router-dom";

export default function GameItem({ game }) {
    return (
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
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
    )
}
