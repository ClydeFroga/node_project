import Redis from "ioredis";
import { ICacheService } from "../interfaces/ICacheService";

export class RedisCacheService implements ICacheService {
  private readonly redis: Redis;
  private readonly defaultTTL = 3600; // 1 hour

  constructor(redisUrl: string = "127.0.0.1:6379") {
    this.redis = new Redis(redisUrl);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(
    key: string,
    value: T,
    ttlSeconds: number = this.defaultTTL
  ): Promise<void> {
    await this.redis.setex(key, ttlSeconds, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
