import { Sprite, SpriteOptions, Texture } from "pixi.js";

export class Entity extends Sprite {
  constructor(options: SpriteOptions) {
    super(options);
  }

  public translate(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
}
