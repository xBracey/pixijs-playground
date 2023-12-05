import { PixiBase } from "../client/context/pixi";
import { Map } from "./map";
import { mapPathConfig } from "./mapPathConfig";

export class TowerDefenceGame {
  private readonly app: PixiBase;
  private readonly map: Map;

  constructor() {
    this.app = new PixiBase(16 * 64, 12 * 64);
    this.map = new Map();

    this.map.load().then(() => {
      this.map.loadPathConfig(mapPathConfig);
      this.app.stage.addChild(this.map.getMapContainer());
    });
  }

  public addToDOM(element: HTMLElement): void {
    this.app.addToDOM(element);
  }
}
