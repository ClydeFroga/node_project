import { IRepository } from "../../Shared/interfaces/IRepository";
import { Purchase } from "../entities/Purchase";

/**
 * Интерфейс репозитория для работы с покупками
 */
export interface IPurchaseRepository extends IRepository<Purchase> {
  /**
   * Создать новую запись о покупке
   * @param userId ID пользователя
   * @param productId ID продукта
   */
  create(userId: number, productId: number): Promise<Purchase>;
}
