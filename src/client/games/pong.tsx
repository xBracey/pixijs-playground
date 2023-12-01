import React, { useContext, useEffect } from "react";
import "../index.css";
import { Game } from "../components/game";
import { PongContext } from "../context";

export const Pong = () => {
  const [points, setPoints] = React.useState<[number, number]>([0, 0]);
  const game = useContext(PongContext);

  useEffect(() => {
    game.addPointsSetState(setPoints);
  }, []);

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

        <Game addToDOM={game.addToDOM.bind(game)} ready={!!game} />
      </div>
    </div>
  );
};
