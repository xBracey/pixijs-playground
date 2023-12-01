import React, { useCallback, useContext, useEffect, useMemo } from "react";
import "./index.css";
import { Game } from "./components/game";
import { EngineContext } from "./context";

export const App = () => {
  const [points, setPoints] = React.useState(0);
  const engine = useContext(EngineContext);

  const addBlock = useCallback(() => {
    const randomX = Math.random() * 800;
    const randomY = Math.random() * 600;

    engine.addBlock(randomX, randomY);
  }, []);

  useEffect(() => {
    if (engine) {
      engine.addOnPoints(setPoints);
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        Array.from({ length: 1000 }).forEach(() => addBlock());
      }
    });
  }, []);

  return (
    <div className="flex justify-center p-4 bg-gray-900 w-screen h-screen">
      <div className="text-3xl font-bold text-lime-300 w-full max-w-2xl flex flex-col items-center">
        <p className="my-4">Hello World</p>

        <div className="flex items-center justify-between w-full ">
          <button
            className=" bg-lime-500 hover:bg-lime-700 text-gray-900 font-bold py-2 px-4 rounded my-4"
            onClick={addBlock}
          >
            Add Block
          </button>

          <p>
            Points <span className="text-lime-500">{points}</span>
          </p>
        </div>
        <Game addToDOM={engine.addToDOM} ready={!!engine} />
      </div>
    </div>
  );
};
