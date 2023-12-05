import { Container, Sprite, Texture } from "pixi.js";
import { TileKey, Tilesheet } from "../tilesheet";

const mapWidth = 16;
const mapHeight = 12;
const defaultTile: TileKey = "grass";

// None is only used for the end tile
type PathDirection = "up" | "down" | "left" | "right" | "none";

interface PathTile {
  x: number;
  y: number;
  direction: PathDirection;
}

export class Map {
  private tilesheet: Tilesheet;
  private tiles: TileKey[][];
  private pathTiles: PathTile[] = [];

  constructor() {
    this.tilesheet = new Tilesheet();
    this.tiles = [];
  }

  public async load(): Promise<void> {
    return new Promise((resolve) => {
      setInterval(() => {
        if (this.tilesheet.spritesheetLoaded) {
          for (let x = 0; x < mapWidth; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < mapHeight; y++) {
              this.tiles[x][y] = defaultTile;
            }
          }
          resolve();
        }
      }, 250);
    });
  }

  public getMapContainer(): Container {
    const container = new Container();

    for (let x = 0; x < mapWidth; x++) {
      for (let y = 0; y < mapHeight; y++) {
        const tile = this.tiles[x][y];
        const texture = this.tilesheet.getTexture(tile);
        const sprite = new Sprite(texture);

        sprite.x = x * 64;
        sprite.y = y * 64;
        sprite.anchor.set(0, 0);
        container.addChild(sprite);
      }
    }

    return container;
  }

  public loadPathConfig(config: [number, number][]): PathTile[] {
    this.pathTiles = config.map((tile, index) => {
      if (index === 0) {
        return {
          x: tile[0],
          y: tile[1],
          direction: this.getStartingTileDirection(tile),
        };
      }

      if (index === config.length - 1) {
        return {
          x: tile[0],
          y: tile[1],
          direction: "none",
        };
      }

      const nextTile = config[index - 1];
      const direction = this.getPathDirection(tile, nextTile);

      return {
        x: tile[0],
        y: tile[1],
        direction,
      };
    });

    for (let index = 0; index < this.pathTiles.length; index++) {
      const pathTile = this.pathTiles[index];

      this.generatePathTiles(pathTile);
    }

    return this.pathTiles;
  }

  public generatePathTiles(tile: PathTile): void {
    switch (tile.direction) {
      case "up":
        this.tiles[tile.x][tile.y] = "path";
        break;
      case "down":
        this.tiles[tile.x][tile.y] = "path";
        break;
      case "left":
        this.tiles[tile.x][tile.y] = "path";
        break;
      case "right":
        this.tiles[tile.x][tile.y] = "path";
        break;
      case "none":
        break;
    }
    return;
  }

  private getPathDirection(
    tile: [number, number],
    nextTile: [number, number]
  ): PathDirection {
    if (tile[0] === nextTile[0]) {
      if (tile[1] + 1 === nextTile[1]) {
        return "down";
      } else if (tile[1] - 1 === nextTile[1]) {
        return "up";
      }
    } else if (tile[1] === nextTile[1]) {
      if (tile[0] + 1 === nextTile[0]) {
        return "right";
      } else if (tile[0] - 1 === nextTile[0]) {
        return "left";
      }
    }

    throw new Error("Tile is not adjacent to the previous tile");
  }

  private getStartingTileDirection(tile: [number, number]): PathDirection {
    if (tile[0] === 0) {
      return "right";
    } else if (tile[0] === mapWidth - 1) {
      return "left";
    } else if (tile[1] === 0) {
      return "down";
    } else if (tile[1] === mapHeight - 1) {
      return "up";
    } else {
      throw new Error("Starting tile is not on the edge of the map");
    }
  }
}
