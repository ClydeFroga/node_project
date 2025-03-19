/**
 * Исключение, которое выбрасывается при попытке списать больше средств, чем есть на балансе
 */
export class InsufficientBalanceException extends Error {
  constructor(userId: number, requested: number, available: number) {
    super(
      `User ${userId} has insufficient balance: requested ${requested}, available ${available}`
    );
    this.name = "InsufficientBalanceException";
  }
}
