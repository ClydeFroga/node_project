import { Entity } from "../../Shared/entities/Entity";

export class User extends Entity<number> {
  private balance: number;

  constructor(id: number, balance: string) {
    super(id);
    this.balance = parseFloat(balance);
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(balance: number): void {
    this.balance = balance;
  }
}
