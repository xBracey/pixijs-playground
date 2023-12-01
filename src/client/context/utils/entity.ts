import { ColorSource, Sprite, SpriteOptions, Texture } from "pixi.js";
import { v4 } from "uuid";

interface EntityProps {
  id?: string;
  tint?: ColorSource;
}

export class Entity extends Sprite {
  public id: string;
  public checkCollisionCallback?: (id: string) => void;

  constructor(options: SpriteOptions & EntityProps) {
    super(options);
    this.id = options.id ?? v4();
    this.anchor.set(0.5, 0.5);
    this.texture = options.texture ?? Texture.WHITE;
    this.tint = options.tint ?? 0xffffff;
  }

  public translate(x: number, y: number): void {
    this.x += x;
    this.y += y;

    if (this.checkCollisionCallback) {
      this.checkCollisionCallback(this.id);
    }
  }
}
