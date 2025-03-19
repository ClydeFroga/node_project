/**
 * Интерфейс для подключения к базе данных
 */
export interface IDatabaseConnection {
  /**
   * Выполнить SQL-запрос
   * @param query SQL-запрос
   * @param params Параметры запроса
   */
  query<T>(query: string, params?: any[]): Promise<T[]>;

  /**
   * Выполнить один запрос и вернуть первый результат
   * @param query SQL-запрос
   * @param params Параметры запроса
   */
  queryOne<T>(query: string, params?: any[]): Promise<T | null>;

  /**
   * Начать транзакцию
   */
  beginTransaction(): Promise<void>;

  /**
   * Подтвердить транзакцию
   */
  commit(): Promise<void>;

  /**
   * Откатить транзакцию
   */
  rollback(): Promise<void>;

  /**
   * Закрыть соединение с базой данных
   */
  close(): Promise<void>;
}
