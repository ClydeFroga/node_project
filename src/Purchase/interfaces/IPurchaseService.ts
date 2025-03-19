import { Purchase } from "../entities/Purchase";

/**
 * Интерфейс сервиса для работы с покупками
 */
export interface IPurchaseService {
  /**
   * Создать запись о покупке
   * @param userId ID пользователя
   * @param productId ID продукта
   */
  recordPurchase(userId: number, productId: number): Promise<Purchase>;
}
