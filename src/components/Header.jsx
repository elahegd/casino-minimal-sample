import React from 'react'

export default function Header({ player, handleSearch, search, logoutUser }) {
    return (
        <div className="flex flex-col md:flex-row bg-gray-900 text-white">
            <main className="flex-1 p-6">
                <div className="flex gap-4 ">
                    <div className="">
                        <img className="rounded-full" src={player.avatar} alt={player.name} />
                    </div>
                    <div className="">
                        <h4 className="text-lg font-semibold">{player.name}</h4>
                        <span className="text-sm text-gray-300">{player.event}</span>
                    </div>
                </div>
                <button onClick={logoutUser} className="mt-4 cursor-pointer bg-green-950 hover:bg-green-900 text-white px-4 py-2 rounded-lg transition">Logout</button>
            </main>
            <aside className="p-6 md:size-max w-full md:order-last flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Search games..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="p-2 border border-gray-300 text-gray-50 rounded w-full"
                />
            </aside>
        </div>
    )
}
