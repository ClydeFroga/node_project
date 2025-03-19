import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { IUserService } from "../../User/interfaces/IUserService";
import { IPurchaseService } from "../../Purchase/interfaces/IPurchaseService";
import { IProductService } from "../../Product/interfaces/IProductService";

/**
 * Создает и настраивает маршруты для пользователей
 */
export function createUserRoutes(
  userService: IUserService,
  purchaseService: IPurchaseService,
  productService: IProductService
): Router {
  const router = Router();
  const userController = new UserController(
    userService,
    purchaseService,
    productService
  );

  // Купить продукт
  router.post("/:id/purchase", (req, res) => {
    userController.purchase(req, res);
  });

  return router;
}
