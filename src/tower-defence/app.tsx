import React from "react";
import "./index.css";
import { TowerDefenceGame } from ".";
import { Game } from "../client/components/game";

export const TowerDefence = () => {
  const [game, setGame] = React.useState<TowerDefenceGame | null>(null);

  const onStartGame = () => {
    setGame(new TowerDefenceGame());
  };

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-2xl flex flex-col items-center">
        <p className="my-4">Hello World</p>

        <button
          className="bg-lime-500 hover:bg-lime-700 text-gray-900 font-bold py-2 px-4 rounded my-4"
          onClick={onStartGame}
        >
          Start Game
        </button>

        {game && <Game addToDOM={game.addToDOM.bind(game)} ready={!!game} />}
      </div>
    </div>
  );
};
