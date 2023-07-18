import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisServices } from './redis.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
	imports: [
		CacheModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				store: redisStore,
				// isGlobal: true,
				host: configService.get('REDIS_HOST'),
				port: parseInt(configService.get('REDIS_PORT'), 10),
				username: configService.get('REDIS_USERNAME'),
				password: configService.get('REDIS_PASSWORD'),
				ttl: parseInt(configService.get('REDIS_TTL'), 10),
			}),
			inject: [ConfigService],
		}),
	],
	providers: [
		RedisServices,
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
	exports: [RedisServices],
})
export class RedisModule {}
