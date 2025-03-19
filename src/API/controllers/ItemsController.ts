import { IItemsService } from "../../items/interfaces/IItemsService";
import { BaseController } from "./BaseController";
import { Request, Response } from "express";

export class ItemsController extends BaseController {
  private itemsService: IItemsService;

  constructor(itemsService: IItemsService) {
    super();
    this.itemsService = itemsService;
  }

  public async getItems(req: Request, res: Response): Promise<Response> {
    return this.handleRequest(req, res, async () => {
      const getMin = await this.itemsService.getMins();

      return this.success(res, getMin, 200);
    });
  }
}
