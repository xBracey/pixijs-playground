import React, { useContext } from "react";
import "../index.css";
import { Game } from "../components/game";
import { PongContext } from "../context";

export const Pong = () => {
  const game = useContext(PongContext);

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-2xl flex flex-col items-center">
        <p className="my-4">Hello World</p>

        <Game addToDOM={game.addToDOM.bind(game)} ready={!!game} />
      </div>
    </div>
  );
};
