import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { EngineContext, PongContext } from "./context";
import { PixiEngine } from "./context/engine";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PongGame } from "./context/pong";
import { Pong } from "./games/pong";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <EngineContext.Provider value={new PixiEngine()}>
        <App />
      </EngineContext.Provider>
    ),
  },
  {
    path: "/pong",
    element: (
      <PongContext.Provider value={new PongGame()}>
        <Pong />
      </PongContext.Provider>
    ),
  },
]);

const rootNode = document.getElementById("root");

if (rootNode) {
  createRoot(rootNode).render(<RouterProvider router={router} />);
}
