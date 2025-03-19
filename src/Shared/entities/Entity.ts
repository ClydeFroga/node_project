/**
 * Базовый абстрактный класс для всех доменных сущностей
 */
export abstract class Entity<T> {
  protected readonly id: T;

  constructor(id: T) {
    this.id = id;
  }

  /**
   * Получить идентификатор сущности
   */
  public getId(): T {
    return this.id;
  }
}
