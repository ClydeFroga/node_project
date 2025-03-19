import { IRepository } from "../../Shared/interfaces/IRepository";
import { User } from "../entities/User";

/**
 * Интерфейс репозитория для работы с пользователями
 * Расширяет базовый интерфейс репозитория дополнительными методами
 */
export interface IUserRepository extends IRepository<User> {
  /**
   * Обновить баланс пользователя
   * @param id Идентификатор пользователя
   * @param amount Сумма для изменения баланса (положительная - пополнение, отрицательная - списание)
   */
  updateBalance(id: number, amount: number): Promise<User | null>;
}
