import { IPurchaseService } from "../interfaces/IPurchaseService";
import { Purchase } from "../entities/Purchase";
import { IPurchaseRepository } from "../interfaces/IPurchaseRepository";

/**
 * Реализация сервиса для работы с покупками
 */
export class PurchaseService implements IPurchaseService {
  private purchaseRepository: IPurchaseRepository;

  constructor(purchaseRepository: IPurchaseRepository) {
    this.purchaseRepository = purchaseRepository;
  }

  /**
   * Создать запись о покупке
   */
  async recordPurchase(userId: number, productId: number): Promise<Purchase> {
    return this.purchaseRepository.create(userId, productId);
  }
}
