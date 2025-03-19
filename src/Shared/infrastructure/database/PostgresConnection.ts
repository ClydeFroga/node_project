import { ConnectionConfig, Pool, PoolClient } from "pg";
import { IDatabaseConnection } from "./IDatabaseConnection";

/**
 * Реализация подключения к PostgreSQL
 */
export class PostgresConnection implements IDatabaseConnection {
  private pool: Pool;
  private client: PoolClient | null = null;

  constructor(connectionOptions: ConnectionConfig) {
    this.pool = new Pool(connectionOptions);
  }

  /**
   * Выполнить SQL-запрос
   */
  async query<T>(query: string, params?: any[]): Promise<T[]> {
    const client = this.client || this.pool;
    const result = await client.query(query, params);
    return result.rows as T[];
  }

  /**
   * Выполнить один запрос и вернуть первый результат
   */
  async queryOne<T>(query: string, params?: any[]): Promise<T | null> {
    const result = await this.query<T>(query, params);
    return result[0] || null;
  }

  /**
   * Начать транзакцию
   */
  async beginTransaction(): Promise<void> {
    this.client = await this.pool.connect();
    await this.client.query("BEGIN");
  }

  /**
   * Подтвердить транзакцию
   */
  async commit(): Promise<void> {
    if (!this.client) {
      throw new Error("Transaction not started");
    }
    await this.client.query("COMMIT");
    this.client.release();
    this.client = null;
  }

  /**
   * Откатить транзакцию
   */
  async rollback(): Promise<void> {
    if (!this.client) {
      throw new Error("Transaction not started");
    }
    await this.client.query("ROLLBACK");
    this.client.release();
    this.client = null;
  }

  /**
   * Закрыть соединение с базой данных
   */
  async close(): Promise<void> {
    if (this.client) {
      this.client.release();
      this.client = null;
    }
    await this.pool.end();
  }
}
