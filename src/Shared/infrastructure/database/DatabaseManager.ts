import { IDatabaseConnection } from "./IDatabaseConnection";
import { DatabaseConnectionFactory } from "./DatabaseConnectionFactory";
import * as dotenv from "dotenv";
import { ConnectionConfig } from "pg";

// Загружаем переменные окружения
dotenv.config();

/**
 * Класс для управления соединениями с базой данных
 */
export class DatabaseManager {
  private static instance: DatabaseManager;
  private connection: IDatabaseConnection | null = null;

  private constructor() {}

  /**
   * Получить экземпляр менеджера базы данных
   */
  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  /**
   * Получить соединение с базой данных
   */
  getConnection(): IDatabaseConnection {
    if (!this.connection) {
      const connectionOptions: ConnectionConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_DATEBASE,
        port: parseInt(process.env.DB_PORT ?? "3000"),
      };

      this.connection =
        DatabaseConnectionFactory.createPostgresConnection(connectionOptions);
    }

    return this.connection;
  }

  /**
   * Закрыть соединение с базой данных
   */
  async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }
}
