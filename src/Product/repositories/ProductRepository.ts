import { Product } from "../entities/Product";
import { IProductRepository } from "../interfaces/IProductRepository";
import { IDatabaseConnection } from "../../Shared/infrastructure/database/IDatabaseConnection";

/**
 * Реализация репозитория продуктов с использованием прямых SQL-запросов
 */
export class ProductRepository implements IProductRepository {
  private db: IDatabaseConnection;

  constructor(db: IDatabaseConnection) {
    this.db = db;
  }

  /**
   * Найти продукт по ID
   */
  async findById(id: number): Promise<Product | null> {
    try {
      await this.db.beginTransaction();
      const query = "SELECT id, cost FROM products WHERE id = $1";
      const result = await this.db.queryOne<{ id: number; cost: string }>(
        query,
        [id]
      );
      await this.db.commit();

      if (!result) {
        return null;
      }

      return new Product(result.id, result.cost);
    } catch (error) {
      console.error("Error finding product by ID:", error);
      throw error;
    }
  }

  /**
   * Найти все продукты
   */
  async findAll(): Promise<Product[]> {
    try {
      const query = "SELECT id, cost FROM products";
      const results = await this.db.query<{ id: number; cost: string }>(query);

      return results.map((result) => new Product(result.id, result.cost));
    } catch (error) {
      console.error("Error finding all products:", error);
      throw error;
    }
  }
}
