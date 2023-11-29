import { createContext } from "react";
import { PixiEngine } from "./engine";

export const EngineContext = createContext(new PixiEngine());
