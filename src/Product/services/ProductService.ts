import { IProductService } from "../interfaces/IProductService";
import { IProductRepository } from "../interfaces/IProductRepository";
import { Product } from "../entities/Product";

export class ProductService implements IProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getProductPrice(productId: number): Promise<number> {
    const product: Product | null = await this.productRepository.findById(
      productId
    );
    if (!product) {
      throw new Error("Product not found");
    }
    return product.getCost();
  }
}
