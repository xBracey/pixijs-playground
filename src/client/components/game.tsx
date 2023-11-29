import React, { useContext, useEffect } from "react";
import { EngineContext } from "../context";

export const Game = () => {
  const pixi = useContext(EngineContext);

  useEffect(() => {
    if (pixi) {
      const gameElement = document.getElementById("game");

      if (gameElement) pixi.addToDOM(gameElement);
    }
  }, []);

  return <div id="game" />;
};
