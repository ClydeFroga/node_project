import { IRepository } from "../../Shared/interfaces/IRepository";
import { Product } from "../entities/Product";

/**
 * Интерфейс репозитория для работы с продуктами
 */
export interface IProductRepository extends IRepository<Product> {}
