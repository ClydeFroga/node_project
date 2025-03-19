import express from "express";
import { createUserRoutes } from "./API/routes/userRoutes";
import { UserService } from "./User/services/UserService";
import { DatabaseManager } from "./Shared/infrastructure/database/DatabaseManager";
import * as dotenv from "dotenv";
import { UserRepository } from "./User/repositories/UserRepository";
import { ProductRepository } from "./Product/repositories/ProductRepository";
import { PurchaseRepository } from "./Purchase/repositories/PurchaseRepository";
import { PurchaseService } from "./Purchase/services/PurchaseService";
import { ProductService } from "./Product/services/ProductService";
import { createItemsRoutes } from "./API/routes/itemsRouter";
import { ItemsService } from "./items/services/ItemsService";
import { RedisCacheService } from "./Shared/services/RedisCacheService";

// Загрузка переменных окружения
dotenv.config();

// Создание Express приложения
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Получение соединения с базой данных через менеджер
const dbConnection = DatabaseManager.getInstance().getConnection();

// Создание репозиториев
const userRepository = new UserRepository(dbConnection);
const productRepository = new ProductRepository(dbConnection);
const purchaseRepository = new PurchaseRepository(dbConnection);

// Создание сервиса кэширования
const cacheService = new RedisCacheService();

// Создание сервисов
const userService = new UserService(userRepository);
const itemsService = new ItemsService(cacheService);
const purchaseService = new PurchaseService(purchaseRepository);
const productService = new ProductService(productRepository);

// Регистрация маршрутов
app.use(
  "/api/users",
  createUserRoutes(userService, purchaseService, productService)
);

// Регистрация маршрутов
app.use("/api/items", createItemsRoutes(itemsService));

// Обработка ошибок
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Обработка завершения работы приложения
process.on("SIGINT", async () => {
  console.log("Shutting down application...");
  await DatabaseManager.getInstance().closeConnection();
  process.exit(0);
});

export default app;
