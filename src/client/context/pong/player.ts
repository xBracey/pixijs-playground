import { Sprite, Texture, Ticker } from "pixi.js";
import { Entity } from "./object";

type PlayerState = "up" | "down" | "idle";

export class Player {
  public readonly entity: Entity;
  private state: PlayerState = "idle";

  constructor(x: number, y: number, isPlayerControlled: boolean) {
    this.entity = new Entity({
      texture: Texture.WHITE,
      width: 50,
      height: 200,
      tint: 0xffffff,
      x,
      y,
    });

    this.entity.anchor.set(0.5, 0.5);

    if (isPlayerControlled) {
      window.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("keyup", this.onKeyUp);
    }
  }

  public onKeyDown = (event: KeyboardEvent): void => {
    console.log(event.key);

    if (event.key === "ArrowUp") {
      this.state = "up";
    } else if (event.key === "ArrowDown") {
      this.state = "down";
    }
  };

  public onKeyUp = (event: KeyboardEvent): void => {
    console.log(event.key);

    if (event.key === "ArrowUp" && this.state === "up") {
      this.state = "idle";
    } else if (event.key === "ArrowDown" && this.state === "down") {
      this.state = "idle";
    }
  };

  public onTick(): void {
    if (this.state === "up") {
      this.entity.translate(0, -5);
    } else if (this.state === "down") {
      this.entity.translate(0, 5);
    }
  }
}
