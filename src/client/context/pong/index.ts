import { PixiBase } from "../pixi";
import { EntityGroup } from "../utils/entityGroup";
import { ReactState } from "../utils/state";
import { Ball } from "./ball";
import { Player } from "./player";
import { Walls } from "./walls";

export class PongGame {
  private readonly app: PixiBase;
  private readonly playerOne: Player;
  private readonly playerTwo: Player;
  private readonly ball: Ball;
  private readonly walls: Walls;
  private readonly entityGroup: EntityGroup;
  private readonly points: ReactState<[number, number]>;

  constructor() {
    this.app = new PixiBase(800, 600);
    this.playerOne = new Player(50, 0, "player1", false);
    this.playerTwo = new Player(750, 0, "player2", false);
    this.ball = new Ball(400, 300);
    this.walls = new Walls(800, 600);
    this.points = new ReactState([0, 0]);

    this.app.ticker.add(this.playerOne.onTick.bind(this.playerOne));
    this.app.ticker.add(this.playerTwo.onTick.bind(this.playerTwo));
    this.app.ticker.add(this.ball.onTick.bind(this.ball));

    this.app.stage.addChild(this.playerOne.entity);
    this.app.stage.addChild(this.playerTwo.entity);
    this.app.stage.addChild(this.ball.entity);
    this.walls.entities.forEach((entity) => this.app.stage.addChild(entity));

    this.app.ticker.start();

    this.entityGroup = new EntityGroup(this.onCollision.bind(this));
    this.entityGroup.add(this.playerOne.entity);
    this.entityGroup.add(this.playerTwo.entity);
    this.entityGroup.add(this.ball.entity);
    this.walls.entities.forEach((entity) => this.entityGroup.add(entity));
    this.entityGroup.addAllCollisionCheck();

    this.ball.start();
  }

  public addPointsSetState = (
    setState: React.Dispatch<React.SetStateAction<[number, number]>>
  ) => {
    this.points.setState = setState;
  };

  public get ticker() {
    return this.app.ticker;
  }

  public addToDOM(element: HTMLElement): void {
    this.app.addToDOM(element);
  }

  public onCollision(id: string, otherId: string) {
    if (id === "ball") {
      if (otherId === "player1" || otherId === "player2") {
        this.ball.move(Math.PI - this.ball.angle);

        const randomOffset = Math.PI / 10;

        const randomAngle = Math.random() * randomOffset - randomOffset / 2;

        this.ball.angle = Math.PI - this.ball.angle + randomAngle;
        this.ball.speed *= 1.1;
      } else if (otherId === "wall-top" || otherId === "wall-bottom") {
        this.ball.angle = -this.ball.angle;
      } else if (otherId === "wall-left" || otherId === "wall-right") {
        this.ball.start();

        if (otherId === "wall-left") {
          this.points.updateState([
            this.points.state[0],
            this.points.state[1] + 1,
          ]);
        } else {
          this.points.updateState([
            this.points.state[0] + 1,
            this.points.state[1],
          ]);
        }
      }
    }
  }
}
