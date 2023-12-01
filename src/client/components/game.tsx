import React, { useContext, useEffect } from "react";
import { EngineContext } from "../context";

interface GameProps {
  addToDOM: (element: HTMLElement) => void;
  ready?: boolean;
}

export const Game = ({ addToDOM, ready }: GameProps) => {
  useEffect(() => {
    if (ready) {
      const gameElement = document.getElementById("game");

      if (gameElement) addToDOM(gameElement);
    }
  }, [ready]);

  return <div id="game" />;
};
