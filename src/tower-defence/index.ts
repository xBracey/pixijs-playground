import { PixiBase } from "../client/context/pixi";
import { EntityGroup } from "../client/context/utils/entityGroup";
import { Enemy } from "./enemy";
import { Map } from "./map";
import { mapPathConfig } from "./mapPathConfig";
import { Tower } from "./towers";

export class TowerDefenceGame {
  private readonly app: PixiBase;
  private readonly map: Map;
  private readonly enemies: Record<string, Enemy>;
  private readonly towers: Record<string, Tower>;
  private readonly entityGroup: EntityGroup;

  constructor() {
    this.app = new PixiBase(16 * 64, 12 * 64);
    this.map = new Map();
    this.enemies = {};
    this.towers = {};
    this.entityGroup = new EntityGroup(this.onCollision.bind(this));

    this.map.load().then(() => {
      this.map.loadPathConfig(mapPathConfig);
      this.app.stage.addChild(this.map.getMapContainer());
      this.app.ticker.start();
    });
  }

  public addToDOM(element: HTMLElement): void {
    this.app.addToDOM(element);
  }

  private onDestroyEnemy(id: string): void {
    delete this.enemies[id];
  }

  public start(): void {
    const numberOfEnemies = 10;

    for (let i = 0; i < numberOfEnemies; i++) {
      const enemy = new Enemy(
        this.map.getPathTiles(),
        this.map.getTexture("enemy"),
        this.onDestroyEnemy.bind(this)
      );
      this.app.stage.addChild(enemy);
      this.app.ticker.add(enemy.onTick.bind(enemy));
      this.enemies[enemy.id] = enemy;

      setTimeout(() => {
        enemy.start();
      }, 250 * i);
    }
  }

  public createTower(x: number, y: number): void {
    const tower = new Tower(
      this.map.getTexture("tankBody"),
      this.map.getTexture("tankCannon"),
      x,
      y
    );
    this.app.stage.addChild(tower);
    this.towers[tower.id] = tower;
  }

  private onCollision(id: string, otherId: string): void {}
}
