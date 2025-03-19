import { ICacheService } from "../../Shared/interfaces/ICacheService";
import { IItems } from "../interfaces/IItems";
import { IItemsMins } from "../interfaces/IItemsMins";
import { IItemsService } from "../interfaces/IItemsService";

export class ItemsService implements IItemsService {
  private readonly CACHE_NAME = "items";

  constructor(private cacheService: ICacheService) {}

  private async getItems(): Promise<{
    tradable: IItems[];
    notTradable: IItems[];
  }> {
    const [tradable, notTradable] = await Promise.all([
      fetch("https://api.skinport.com/v1/items?tradable=true"),
      fetch("https://api.skinport.com/v1/items"),
    ]);

    const data = (await Promise.all([
      tradable.json() as Promise<IItems[]>,
      notTradable.json() as Promise<IItems[]>,
    ])) as [IItems[], IItems[]];

    return { tradable: data[0], notTradable: data[1] };
  }

  private calculateMins(
    tradable: IItems[],
    notTradable: IItems[]
  ): IItemsMins[] {
    return notTradable.map((el) => {
      const tradableData = tradable.find(
        (item) => el.market_hash_name === item.market_hash_name
      );

      return {
        market_hash_name: el.market_hash_name,
        tradable: tradableData?.min_price ?? null,
        notTradable: el.min_price,
      };
    });
  }

  async getMins(): Promise<IItemsMins[]> {
    // Сначала проверяем кэш
    const cachedMins = await this.cacheService.get<IItemsMins[]>(
      this.CACHE_NAME
    );

    if (cachedMins) {
      return cachedMins;
    }

    // Если кэша нет - получаем данные и считаем
    const { tradable, notTradable } = await this.getItems();
    const mins = this.calculateMins(tradable, notTradable);

    await this.cacheService.set<IItemsMins[]>(this.CACHE_NAME, mins, 60 * 5);

    return mins;
  }
}
