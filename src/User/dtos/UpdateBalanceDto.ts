/**
 * DTO для операций с балансом пользователя
 */
export class UpdateBalanceDto {
  productId: number;

  constructor(productId: number) {
    this.productId = productId;
  }
}
