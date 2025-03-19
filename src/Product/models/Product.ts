import { IProduct } from "../interfaces/IProduct";

export class Product implements IProduct {
  constructor(public id: number, public price: number) {}

  getPrice(): number {
    return this.price;
  }
}
