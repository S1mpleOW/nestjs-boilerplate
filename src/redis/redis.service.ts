import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IRedisData } from './redis.interface';
import { TOKEN_EXPIRES } from 'src/common/configs/constants';

@Injectable()
export class RedisServices {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore) {}

	set(redisData: IRedisData): void | Promise<void> {
		const { key, value, expired } = redisData;
		return this.cacheManager.set(key, value, {
			ttl: +expired,
		});
	}

	async setNx(redisData: IRedisData): Promise<void> {
		const { key, value, expired } = redisData;
		const hasValue = await this.cacheManager.get(key);
		if (!hasValue) {
			return await this.cacheManager.set(key, value, +expired);
		} else {
			throw new Error('Key already exists');
		}
	}

	get(key: string): string | Promise<string | null> {
		return this.cacheManager.get(key);
	}
	async getRefreshToken(sub: string) {
		const key = `RF_TOKEN:${sub}`;
		const getRfToken = await this.get(key);
		if (!getRfToken) {
			throw new NotFoundException('Refresh token not found');
		}
		return getRfToken;
	}
	async getAccessToken(sub: string) {
		const key = `AC_TOKEN:${sub}`;
		console.log('🚀 ~ RedisServices ~ getAccessToken ~ key:', key);
		console.log(await this.cacheManager.get<string | null>('123'));
		const accessToken = await this.get(key);
		if (!accessToken) {
			throw new NotFoundException('Access token not found');
		}
		return accessToken;
	}
	async setRefreshToken(sub: string, token: string) {
		const key = `RF_TOKEN:${sub}`;
		return this.set({
			key,
			value: token,
			expired: TOKEN_EXPIRES.redisRefreshToken,
		});
	}

	async setAccessToken(sub: string, token: string) {
		const key = `AC_TOKEN:${sub}`;
		return this.set({
			key,
			value: token,
			expired: TOKEN_EXPIRES.redisAccessToken,
		});
	}
	async del(key: string) {
		return this.cacheManager.del(key);
	}

	async delRFToken(sub: string) {
		const key = `RF_TOKEN:${sub}`;
		return this.cacheManager.del(key);
	}

	async delAccessToken(sub: string) {
		const key = `AC_TOKEN:${sub}`;
		return this.cacheManager.del(key);
	}
}
