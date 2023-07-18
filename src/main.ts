import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DatabaseConfig } from './common/configs/database.config';

async function bootstrap() {
	const logger = new Logger(bootstrap.name);
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const database_env = configService.get<DatabaseConfig>('database');
	logger.debug(`database_env: ${JSON.stringify(database_env)}`);
	app.setGlobalPrefix('api');
	app.enableCors({
		origin: '*',
	});

	const port: number = +configService.get('PORT') || 3000;
	await app.listen(port, () => {
		logger.log(`Server running on port ${configService.get('PORT')}`);
	});
}
bootstrap();
