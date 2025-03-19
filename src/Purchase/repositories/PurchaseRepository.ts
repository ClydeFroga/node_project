import { Purchase } from "../entities/Purchase";
import { IPurchaseRepository } from "../interfaces/IPurchaseRepository";
import { IDatabaseConnection } from "../../Shared/infrastructure/database/IDatabaseConnection";

/**
 * Реализация репозитория покупок с использованием прямых SQL-запросов
 */
export class PurchaseRepository implements IPurchaseRepository {
  private db: IDatabaseConnection;

  constructor(db: IDatabaseConnection) {
    this.db = db;
  }

  /**
   * Найти покупку по ID
   */
  async findById(id: number): Promise<Purchase | null> {
    try {
      const query =
        "SELECT purchases_id FROM purchases WHERE purchases_id = $1";
      const result = await this.db.queryOne<{
        purchases_id: number;
        user_id: number;
        product_id: number;
      }>(query, [id]);

      if (!result) {
        return null;
      }

      return new Purchase(result.purchases_id);
    } catch (error) {
      console.error("Error finding purchase by ID:", error);
      throw error;
    }
  }

  /**
   * Создать новую запись о покупке
   */
  async create(userId: number, productId: number): Promise<Purchase> {
    try {
      const query = `
        INSERT INTO purchases (user_id, product_id) 
        VALUES ($1, $2) 
        RETURNING purchases_id
      `;

      const result = await this.db.queryOne<{
        purchases_id: number;
      }>(query, [userId, productId]);

      if (!result) {
        throw new Error("Failed to create purchase record");
      }

      return new Purchase(result.purchases_id);
    } catch (error) {
      console.error("Error creating purchase:", error);
      throw error;
    }
  }
}
