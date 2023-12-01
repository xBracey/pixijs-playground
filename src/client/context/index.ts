import { createContext } from "react";
import { PixiEngine } from "./engine";
import { PongGame } from "./pong";

export const EngineContext = createContext(new PixiEngine());
export const PongContext = createContext(new PongGame());
