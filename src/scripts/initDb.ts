import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { DatabaseManager } from "../Shared/infrastructure/database/DatabaseManager";

// Загрузка переменных окружения
dotenv.config();

/**
 * Функция для инициализации базы данных
 */
async function initializeDatabase() {
  try {
    console.log("Connecting to database...");
    const dbConnection = DatabaseManager.getInstance().getConnection();
    console.log("Connected to database");

    // Чтение SQL скрипта
    const sqlFilePath = path.join(
      __dirname,
      "../Shared/infrastructure/database/migrations/init.sql"
    );
    const sqlScript = fs.readFileSync(sqlFilePath, "utf8");

    console.log("Executing initialization script...");
    await dbConnection.query(sqlScript);
    console.log("Database initialized successfully");

    // Создание тестового пользователя
    console.log("Creating test user...");
    await dbConnection.query(`
      INSERT INTO users (balance) 
      VALUES (1000) 
      ON CONFLICT DO NOTHING
    `);
    console.log("Test user created");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  } finally {
    await DatabaseManager.getInstance().closeConnection();
  }
}

// Запуск инициализации базы данных
initializeDatabase()
  .then(() => {
    console.log("Database setup completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Database setup failed:", error);
    process.exit(1);
  });
