import {
  Application,
  BackgroundSystem,
  Sprite,
  Ticker,
  autoDetectRenderer,
} from "pixi.js";
import { Block } from "./block";
import { v4 as uuidv4 } from "uuid";

export class PixiEngine {
  private readonly app: Application;
  private blocks: Record<string, Block> = {};
  public points: number = 0;
  private delta: number = 0.1;
  private onPoints: (points: number) => void;

  constructor() {
    this.app = new Application();
    this.app.init();
    this.app.ticker = new Ticker();
    this.updateBlockTicker();
    this.onPoints = () => {};
  }

  public addToDOM(element: HTMLElement): void {
    const interval = setInterval(() => {
      if (this.app.renderer.view.canvas) {
        element.appendChild(
          this.app.renderer.view.canvas as unknown as HTMLElement
        );
        clearInterval(interval);
      }
    }, 100);
  }

  public addBlock = (x: number, y: number): void => {
    const id = uuidv4();

    const block = new Block(
      x,
      y,
      50,
      50,
      Math.random() * 0xffffff,
      id,
      this.onBlockClick.bind(this)
    );
    this.blocks[id] = block;
    block.addToApp(this.app);

    console.log(Object.values(this.blocks).length);
  };

  public get blockTicker() {
    return () => {
      Object.entries(this.blocks).forEach(([id, block]) => {
        block.translate(this.points * this.delta, this.points * this.delta);

        const blockGraphics = block.getGraphics();

        if (blockGraphics.y > 600 || blockGraphics.x > 800) {
          block.destroy();
          delete this.blocks[id];
        }
      });
    };
  }

  public updateBlockTicker = () => {
    if (this.blockTicker) this.app.ticker.remove(this.blockTicker);
    this.app.ticker.add(this.blockTicker);
  };

  private onBlockClick(graphic: Sprite, id: string): void {
    this.points++;
    this.onPoints(this.points);
    this.updateBlockTicker();
    graphic.destroy();
    delete this.blocks[id];
  }

  public addOnPoints(callback: (points: number) => void): void {
    this.onPoints = callback;
  }
}
