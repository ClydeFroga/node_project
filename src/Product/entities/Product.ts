import { Entity } from "../../Shared/entities/Entity";

export class Product extends Entity<number> {
  private cost: number;

  constructor(id: number, cost: string) {
    super(id);
    this.cost = parseFloat(cost);
  }

  public getCost(): number {
    return this.cost;
  }
}
