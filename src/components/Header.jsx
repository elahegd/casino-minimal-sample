import React, { useState, useRef, useEffect } from 'react';
import Logout from "../assets/logout.svg";
import Logo from "../assets/logo.svg";
import ArrowDown from "../assets/arrow-down.svg";

export default function Header({ player, logoutUser }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex flex-row bg-gray-900 text-white">
            <div className="flex-1 p-6">
                <div className="relative inline-block" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(prev => !prev)}
                        className="flex items-center gap-3 p-2 cursor-pointer rounded-md hover:bg-gray-800 transition w-full md:w-auto"
                    >
                        <img className="w-10 h-10 rounded-full" src={player.avatar} alt={player.name} />

                        <span className="text-lg font-semibold hidden md:inline-block">{player.name}</span>
                        <img src={ArrowDown} alt="arrow down" className="w-4 h-4" />
                    </button>

                    {showDropdown && (
                        <div className="absolute mt-2 w-60 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                            <div className="px-4 py-3 text-sm text-gray-200 border-b border-gray-700 md:hidden">
                                {player.name}
                            </div>
                            <div className="px-4 py-3 text-sm text-gray-200 border-b border-gray-700">
                                {player.event}
                            </div>
                            <button
                                onClick={logoutUser}
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2"
                            >
                                <img src={Logout} className="w-4 h-4" alt="logout icon" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 size-max">
                <div className="w-full">
                    <img src={Logo} alt="logo" className="w-50 h-auto" />
                </div>
            </div>
        </div>
    );
}
