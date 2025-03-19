import { Router } from "express";
import { ItemsController } from "../controllers/ItemsController";
import { IItemsService } from "../../items/interfaces/IItemsService";

/**
 * Создает и настраивает маршруты для пользователей
 */
export function createItemsRoutes(itemsService: IItemsService): Router {
  const router = Router();
  const itemsController = new ItemsController(itemsService);

  router.get("/", (req, res) => {
    itemsController.getItems(req, res);
  });

  return router;
}
