// Setup simple express server

import { WebSocket } from "ws";
import express from "express";
import expressWs from "express-ws";
import { v4 as uuidv4 } from "uuid";

const { app, getWss } = expressWs(express());

const wss = getWss();

interface ExtWebSocket extends WebSocket {
  id: string;
}

interface IPlayer {
  id: string;
  x: number;
  y: number;
  rotation: number;
  points: number;
}

const players: Record<string, IPlayer> = {};

wss.on("connection", (ws) => {
  const websocket: ExtWebSocket = ws as unknown as ExtWebSocket;

  websocket.id = uuidv4();

  players[websocket.id] = {
    id: websocket.id,
    x: 0,
    y: 0,
    rotation: 0,
    points: 0,
  };
});

app.ws("/ws", (ws, req) => {
  const websocket: ExtWebSocket = ws as unknown as ExtWebSocket;

  ws.on("message", (msg) => {
    ws.send(msg);
    console.log(msg);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000 :)");
});
