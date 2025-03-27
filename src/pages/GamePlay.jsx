import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowLeft from "../assets/arrow-left.svg";

export default function GamePlay() {
    const { gameCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (gameCode && window.comeon && window.comeon.game) {
            comeon.game.launch(gameCode);
        }
    }, [gameCode]);

    const handleGoBack = () => {
        navigate('/games');
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <button
                className="flex items-center cursor-pointer gap-2 mt-4 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md"
                onClick={handleGoBack}>
                <img src={ArrowLeft} alt="arrow left" className="w-4 h-4" />
                Back to Games
            </button>
            <div className="rounded-xl border-2 border-gray-700 mt-4">
                <div id="game-launch"></div>
            </div>
        </div>
    );
}
