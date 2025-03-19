import { IUserService } from "../interfaces/IUserService";
import { UserDto } from "../dtos/UserDto";
import { IUserRepository } from "../interfaces/IUserRepository";
import { InsufficientBalanceException } from "../exceptions/InsufficientBalanceException";

/**
 * Реализация сервиса для работы с пользователями
 */
export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Получить пользователя по ID
   */
  async getUserById(id: number): Promise<UserDto | null> {
    const user = await this.userRepository.findById(id);
    return user ? UserDto.fromEntity(user) : null;
  }

  /**
   * Изменить баланс пользователя
   */
  async updateBalance(id: number, amount: number): Promise<UserDto> {
    // Сначала получаем текущий баланс
    const user = await this.getUserById(id);

    if (user === null) {
      throw new Error(`User with id ${id} not found`);
    }

    // Проверяем баланс
    if (user.balance < amount) {
      throw new InsufficientBalanceException(id, amount, user.balance);
    }

    // Снимаем средства (передаем отрицательное значение для списания)
    const updatedUser = await this.userRepository.updateBalance(id, -amount);
    if (!updatedUser) {
      throw new Error(`Failed to update balance for user ${id}`);
    }

    return UserDto.fromEntity(updatedUser);
  }
}
