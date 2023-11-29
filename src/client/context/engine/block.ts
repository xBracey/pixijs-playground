import * as PIXI from "pixi.js";

export class Block {
  private readonly graphics: PIXI.Sprite;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    fill: PIXI.ColorSource,
    id: string,
    onClick?: (graphic: PIXI.Sprite, id: string) => void
  ) {
    const texture = PIXI.Texture.WHITE;

    this.graphics = new PIXI.Sprite(texture);
    this.graphics.x = x;
    this.graphics.y = y;
    this.graphics.width = width;
    this.graphics.height = height;
    this.graphics.tint = fill;

    if (onClick) {
      this.graphics.interactive = true;
      this.graphics.on("pointerdown", () => {
        onClick(this.graphics, id);
      });
    }
  }

  public addToApp(app: PIXI.Application): void {
    app.stage.addChild(this.graphics);
  }

  public getGraphics(): PIXI.Sprite {
    return this.graphics;
  }

  public destroy(): void {
    this.graphics.destroy();
  }

  public translate(x: number, y: number): void {
    this.graphics.x += x;
    this.graphics.y += y;
  }
}
