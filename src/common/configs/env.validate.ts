import { InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
	IsAlphanumeric,
	IsNotEmpty,
	IsNumber,
	IsString,
	validateSync,
} from 'class-validator';

class EnvironmentValidators {
	@IsNotEmpty()
	@IsString()
	APPLICATION_VERSION: string;

	@IsNumber()
	PORT?: number;

	@IsNotEmpty()
	@IsString()
	DB_USERNAME: string;

	@IsNotEmpty()
	@IsAlphanumeric()
	DB_PASSWORD: string | number;

	@IsNotEmpty()
	@IsString()
	DB_HOST: string;

	@IsNotEmpty()
	@IsNumber()
	DB_PORT: number;

	@IsNotEmpty()
	@IsString()
	DB_NAME: string;

	@IsNotEmpty()
	@IsString()
	DB_URI: string;

	@IsNotEmpty()
	@IsString()
	NODE_ENV: 'local' | 'production';

	@IsNotEmpty()
	@IsString()
	SECRET_JWT: string;

	@IsNotEmpty()
	@IsString()
	REDIS_HOST: string;

	@IsNotEmpty()
	@IsNumber()
	REDIS_PORT: number;

	@IsString()
	REDIS_USERNAME?: string;

	@IsString()
	REDIS_PASSWORD?: string;

	@IsNotEmpty()
	@IsNumber()
	REDIS_TTL: number;

	@IsNotEmpty()
	@IsAlphanumeric()
	SECRET_KEY: string;

	@IsNotEmpty()
	@IsAlphanumeric()
	SECRET_KEY_IV: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentValidators, config, {
		enableImplicitConversion: true,
	});

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new InternalServerErrorException(errors.toString());
	}

	return validatedConfig;
}
