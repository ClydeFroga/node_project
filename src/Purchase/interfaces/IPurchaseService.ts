import { Purchase } from "../entities/Purchase";
import { UserDto } from "../../User/dtos/UserDto";

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
