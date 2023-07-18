import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { VersionMiddleware } from '../common/middlewares/version/version.middleware';
import { ConfigModule } from '@nestjs/config';
import { database_config } from 'src/common/configs/database.config';
import { DatabaseModule } from 'src/common/database/database.module';
import { APIModule } from 'src/apis/api.module';
import { JWTModule } from 'src/jwt/jwt.module';
import { PassportModule } from 'src/passport/passport.module';
import { RedisModule } from 'src/redis/redis.module';
import { validate } from 'src/common/configs/env.validate';
import { CryptoModule } from 'src/crypto/crypto.module';
import { providers } from './app.provider';
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `${process.env.NODE_ENV}.env`,
			cache: true,
			expandVariables: true,
			load: [database_config],
			validate,
		}),
		DatabaseModule,
		APIModule,
		JWTModule,
		PassportModule,
		RedisModule,
		CryptoModule,
	],
	controllers: [],
	providers: [...providers],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(VersionMiddleware).forRoutes('*');
	}
}
