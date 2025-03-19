import { Request, Response } from "express";

/**
 * Базовый контроллер с общими методами для всех контроллеров
 */
export abstract class BaseController {
  /**
   * Метод для успешного ответа
   */
  protected success<T>(
    res: Response,
    data: T,
    statusCode: number = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      data,
    });
  }

  /**
   * Метод для ответа с ошибкой
   */
  protected error(
    res: Response,
    message: string,
    statusCode: number = 400
  ): Response {
    return res.status(statusCode).json({
      success: false,
      error: message,
    });
  }

  /**
   * Обработка ошибок в контроллере
   */
  protected async handleRequest(
    _req: Request,
    res: Response,
    callback: () => Promise<Response>
  ): Promise<Response> {
    try {
      return await callback();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error occurred";
      console.error(`Error processing request: ${message}`, error);
      return this.error(res, message, 500);
    }
  }
}
