import React, { useContext, useEffect } from "react";
import "../index.css";
import { Game } from "../components/game";
import { PongGame } from "../context/pong";

export const Pong = () => {
  const [points, setPoints] = React.useState<[number, number]>([0, 0]);
  const [game, setGame] = React.useState<PongGame | null>(null);

  const onStartGame = () => {
    setGame(new PongGame(setPoints));
  };

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-2xl flex flex-col items-center">
        <p className="my-4">Hello World</p>

        <div className="flex items-center justify-between w-full ">
          <p>
            Points <span className="text-lime-500">{points[0]}</span>
          </p>
          <p>
            Points <span className="text-lime-500">{points[1]}</span>
          </p>
        </div>

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
