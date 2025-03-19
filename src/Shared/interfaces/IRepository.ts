/**
 * Базовый интерфейс репозитория для CRUD операций
 */
export interface IRepository<T> {
  /**
   * Найти сущность по идентификатору
   * @param id Идентификатор сущности
   */
  findById(id: number): Promise<T | null>;
}
