import { Entity } from "../../Shared/entities/Entity";

export class Purchase extends Entity<number> {
  constructor(id: number) {
    super(id);
  }
}
