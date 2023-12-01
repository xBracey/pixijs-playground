import { Entity } from "./entity";

export class EntityGroup {
  private entities: Record<string, Entity>;
  private onCollisionCallback: (id: string, otherId: string) => void;

  constructor(onCollisionCallback: (id: string, otherId: string) => void) {
    this.entities = {};
    this.onCollisionCallback = onCollisionCallback;
  }

  add(entity: Entity) {
    this.entities[entity.id] = entity;
  }

  remove(id: string) {
    delete this.entities[id];
  }

  addAllCollisionCheck() {
    Object.values(this.entities).forEach((entity) => {
      entity.checkCollisionCallback = this.onCheckCollision.bind(this);
    });
  }

  onCheckCollision(id: string) {
    const entity = this.entities[id];

    Object.values(this.entities).forEach((otherEntity) => {
      if (otherEntity.id === id) return;

      if (entity.getBounds().intersects(otherEntity.getBounds())) {
        this.onCollisionCallback(id, otherEntity.id);
      }
    });
  }
}
