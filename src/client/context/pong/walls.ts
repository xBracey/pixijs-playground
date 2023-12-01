import { Texture } from "pixi.js";
import { Entity } from "../utils/entity";

const thickness = 1000;

export class Walls {
  public entities: Entity[];

  constructor(width: number, height: number) {
    const texture = Texture.WHITE;
    texture.textureMatrix;

    const offset = -thickness / 2 + 1;

    const topWall = new Entity({
      width,
      height: thickness,
      x: width / 2,
      y: -thickness / 2 + 1,
      id: "wall-top",
    });
    const bottomWall = new Entity({
      width,
      height: thickness,
      x: width / 2,
      y: height - offset,
      id: "wall-bottom",
    });
    const leftWall = new Entity({
      width: thickness,
      height,
      x: offset,
      y: height / 2,
      id: "wall-left",
    });
    const rightWall = new Entity({
      width: thickness,
      height,
      x: width - offset,
      y: height / 2,
      id: "wall-right",
    });

    this.entities = [topWall, bottomWall, leftWall, rightWall];
  }
}
