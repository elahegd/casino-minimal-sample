import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowDown from "../assets/arrow-down.svg";
import ArrowUp from "../assets/arrow-up.svg";
import ArrowRight from "../assets/arrow-right.svg";

export default function GameItem({ game }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isExpanded]);

    return (
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 w-full max-w-4xl mx-auto">
            <div className="aspect-square w-32 flex items-center sm:w-40 overflow-hidden rounded-xl border-2 border-gray-700 flex-shrink-0">
                <img className="w-auto max-h-32" src={game.icon} alt={game.name} />
            </div>

            <div className="sm:ml-6 mt-4 sm:mt-0 flex-1 text-left w-full">
                <h2 data-testid={`game-title-${game.code}`} className="text-xl font-bold text-white mb-1 break-words">{game.name}</h2>

                <div
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
                    style={{ maxHeight: isExpanded ? `${contentHeight}px` : '3.5rem' }}
                >
                    <p ref={contentRef} className="text-sm text-gray-300">
                        {game.description}
                    </p>
                </div>

                {game.description.length > 100 && (
                    <button
                        onClick={toggleExpand}
                        className="flex items-center cursor-pointer text-green-400 mt-2 hover:underline text-sm"
                        data-testid={`collapse-btn-${game.code}`}
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                        <img
                            src={isExpanded ? ArrowUp : ArrowDown}
                            alt="toggle icon"
                            className="ml-1 w-4 h-4"
                        />
                    </button>
                )}

                <Link 
                    to={`/game/${game.code}`} 
                    className="inline-flex items-center cursor-pointer gap-2 mt-4 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md"
                    data-testid={`play-btn-${game.code}`}
                >
                    <span>Play</span>
                    <img src={ArrowRight} alt="arrow right" className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
