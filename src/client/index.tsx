import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { EngineContext } from "./context";
import { PixiEngine } from "./context/engine";

const rootNode = document.getElementById("root");

if (rootNode) {
  createRoot(rootNode).render(
    <EngineContext.Provider value={new PixiEngine()}>
      <App />
    </EngineContext.Provider>
  );
}
