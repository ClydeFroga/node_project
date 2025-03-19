import { UserDto } from "../dtos/UserDto";

/**
 * Интерфейс сервиса для работы с пользователями
 */
export interface IUserService {
  /**
   * Получить пользователя по ID
   */
  getUserById(id: number): Promise<UserDto | null>;

  /**
   * Изменить баланс пользователя
   */
  updateBalance(id: number, amount: number): Promise<UserDto>;
}
