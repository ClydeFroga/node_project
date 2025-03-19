import { IItemsMins } from "./IItemsMins";

export interface IItemsService {
  getMins(): Promise<IItemsMins[]>;
}
