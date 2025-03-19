import { ConnectionConfig } from "pg";
import { IDatabaseConnection } from "./IDatabaseConnection";
import { PostgresConnection } from "./PostgresConnection";

/**
 * Фабрика для создания подключений к базе данных
 */
export class DatabaseConnectionFactory {
  /**
   * Создать подключение к PostgreSQL
   */
  static createPostgresConnection(
    connectionOptions: ConnectionConfig
  ): IDatabaseConnection {
    return new PostgresConnection(connectionOptions);
  }
}
