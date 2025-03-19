import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IDatabaseConnection } from "../../Shared/infrastructure/database/IDatabaseConnection";

/**
 * Реализация репозитория пользователей с использованием прямых SQL-запросов
 */
export class UserRepository implements IUserRepository {
  private db: IDatabaseConnection;

  constructor(db: IDatabaseConnection) {
    this.db = db;
  }

  /**
   * Найти пользователя по ID
   */
  async findById(id: number): Promise<User | null> {
    try {
      const query = "SELECT id, balance FROM users WHERE id = $1";
      const result = await this.db.queryOne<{ id: number; balance: string }>(
        query,
        [id]
      );

      if (!result) {
        return null;
      }

      return new User(result.id, result.balance);
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw error;
    }
  }

  /**
   * Обновить баланс пользователя
   */
  async updateBalance(id: number, amount: number): Promise<User | null> {
    try {
      await this.db.beginTransaction();

      // Обновляем баланс
      const query = `UPDATE users 
      	SET balance = balance + $1
				WHERE id = $2
				RETURNING id, balance`;

      const result = await this.db.queryOne<{
        id: number;
        balance: string;
      }>(query, [amount, id]);

      if (!result) {
        await this.db.rollback();
        return null;
      }

      // Подтверждаем транзакцию
      await this.db.commit();

      return new User(result.id, result.balance);
    } catch (error) {
      console.error("Error updating balance:", error);
      throw error;
    }
  }
}
