import { PixiBase } from "../pixi";
import { Player } from "./player";

export class PongGame {
  private readonly app: PixiBase;
  private readonly playerOne: Player;
  private readonly playerTwo: Player;

  constructor() {
    this.app = new PixiBase(800, 600);
    this.playerOne = new Player(50, 0, true);
    this.playerTwo = new Player(750, 0, false);

    this.app.ticker.add(this.playerOne.onTick.bind(this.playerOne));
    this.app.ticker.add(this.playerTwo.onTick.bind(this.playerTwo));

    this.app.stage.addChild(this.playerOne.entity);
    this.app.stage.addChild(this.playerTwo.entity);

    this.app.ticker.start();
  }

  public get ticker() {
    return this.app.ticker;
  }

  public addToDOM(element: HTMLElement): void {
    this.app.addToDOM(element);
  }
}
