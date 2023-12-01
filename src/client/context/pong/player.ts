import { Texture } from "pixi.js";
import { Entity } from "../utils/entity";

type PlayerState = "up" | "down" | "idle";

interface PlayerKeys {
  up: string;
  down: string;
}

const playerOneKeys: PlayerKeys = {
  up: "w",
  down: "s",
};
const playerTwoKeys: PlayerKeys = {
  up: "ArrowUp",
  down: "ArrowDown",
};

export class Player {
  public readonly entity: Entity;
  private state: PlayerState = "idle";
  private keys: PlayerKeys;

  constructor(
    x: number,
    y: number,
    player: "player1" | "player2",
    isCpu: boolean
  ) {
    this.entity = new Entity({
      texture: Texture.WHITE,
      width: 50,
      height: 200,
      tint: 0xffffff,
      x,
      y,
      id: player,
    });

    this.keys = player === "player1" ? playerOneKeys : playerTwoKeys;

    if (!isCpu) {
      window.addEventListener("keydown", this.onKeyDown);
      window.addEventListener("keyup", this.onKeyUp);
    }
  }

  public onKeyDown = (event: KeyboardEvent): void => {
    console.log(event.key);

    if (event.key === this.keys.up) {
      this.state = "up";
    } else if (event.key === this.keys.down) {
      this.state = "down";
    }
  };

  public onKeyUp = (event: KeyboardEvent): void => {
    console.log(event.key);

    if (event.key === this.keys.up && this.state === "up") {
      this.state = "idle";
    } else if (event.key === this.keys.down && this.state === "down") {
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
