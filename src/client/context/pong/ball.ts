import { Texture } from "pixi.js";
import { Entity } from "../utils/entity";

type BallState = "moving" | "idle";

export class Ball {
  public readonly entity: Entity;
  public state: BallState = "idle";
  public angle: number = 0;
  public speed: number = 3;
  public maxSpeed: number = 10;
  public originalPosition: { x: number; y: number };

  constructor(x: number, y: number) {
    this.entity = new Entity({
      texture: Texture.WHITE,
      width: 20,
      height: 20,
      tint: 0xffffff,
      x,
      y,
      id: "ball",
    });
    this.originalPosition = { x, y };

    this.entity.anchor.set(0.5, 0.5);
  }

  public onTick(): void {
    if (this.state === "moving") {
      this.move(this.angle);
    }
  }

  public move(angle: number): void {
    const speed = Math.min(this.speed, this.maxSpeed);

    const x = Math.cos(angle) * speed;
    const y = Math.sin(angle) * speed;
    this.entity.translate(x, y);
  }

  public start(): void {
    this.speed = 3;
    this.entity.x = this.originalPosition.x;
    this.entity.y = this.originalPosition.y;
    this.angle = Math.random() * (Math.PI / 6) - Math.PI / 3 + Math.PI / 2;
    this.state = "moving";
  }
}
