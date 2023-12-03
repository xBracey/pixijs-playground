import { createContext } from "react";
import { PixiEngine } from "./engine";
import React from "react";

export const EngineContext = createContext(new PixiEngine());
