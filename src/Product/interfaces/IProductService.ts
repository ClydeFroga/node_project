export interface IProductService {
  getProductPrice(productId: number): Promise<number>;
}
