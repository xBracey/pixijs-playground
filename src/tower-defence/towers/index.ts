import { Container, Sprite, Texture } from "pixi.js";
import { v4 } from "uuid";

export class Tower extends Container {
  private range: number = 192;
  public id: string;

  constructor(
    bodyTexture: Texture,
    cannonTexture: Texture,
    x: number,
    y: number
  ) {
    super();
    this.x = x;
    this.y = y;
    this.id = `tower-${v4()}`;

    const bodySprite = new Sprite(bodyTexture);
    const cannonSprite = new Sprite(cannonTexture);

    bodySprite.anchor.set(0, 0);
    cannonSprite.anchor.set(0, 0);

    this.addChild(bodySprite);
    this.addChild(cannonSprite);
  }
}
