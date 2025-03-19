import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { IUserService } from "../../User/interfaces/IUserService";
import { InsufficientBalanceException } from "../../User/exceptions/InsufficientBalanceException";
import { IPurchaseService } from "../../Purchase/interfaces/IPurchaseService";
import { IProductService } from "../../Product/interfaces/IProductService";
import { ProductNotFoundException } from "../../Product/exceptions/ProductNotFoundException";

/**
 * Контроллер для обработки запросов, связанных с пользователями
 */
export class UserController extends BaseController {
  private purchaseService: IPurchaseService;
  private userService: IUserService;
  private productService: IProductService;

  constructor(
    userService: IUserService,
    purchaseService: IPurchaseService,
    productService: IProductService
  ) {
    super();
    this.purchaseService = purchaseService;
    this.userService = userService;
    this.productService = productService;
  }

  /**
   * Провести покупку продукта
   */
  async purchase(req: Request, res: Response): Promise<Response> {
    return this.handleRequest(req, res, async () => {
      const userId = parseInt(req.params.id || "");
      const { productId } = req.body;

      if (!userId) {
        return this.error(res, "User ID is required", 400);
      }

      if (productId === undefined || isNaN(Number(productId))) {
        return this.error(res, "Valid product ID is required", 400);
      }

      try {
        const productCost = await this.productService.getProductPrice(
          Number(productId)
        );

        const resultOfBuying = await this.userService.updateBalance(
          userId,
          productCost
        );

        await this.purchaseService.recordPurchase(userId, Number(productId));

        return this.success(
          res,
          {
            balance: resultOfBuying.balance,
          },
          200
        );
      } catch (error) {
        if (error instanceof InsufficientBalanceException) {
          return this.error(res, error.message, 400);
        }
        if (error instanceof ProductNotFoundException) {
          return this.error(res, error.message, 404);
        }
        throw error;
      }
    });
  }
}
