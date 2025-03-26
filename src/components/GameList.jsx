import React from 'react';
import GameItem from './GameItem';

export default function GameList({ games }) {
    return (
        <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Available Games</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game, idx) => (
                    <GameItem game={game} key={idx} />
                ))}
                {!games.length && <p className="text-red-100">There is no game with your keyword!</p>}
            </div>
        </main>
    )
}
