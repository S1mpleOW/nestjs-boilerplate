import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export interface DatabaseConfig {
	host: string;
	port: number;
	name: string;
	username: string;
	password: string;
	uri: string;
}

export const database_config = () => {
	const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_URI } =
		process.env;

	return {
		database: {
			uri: DB_URI,
			host: DB_HOST,
			port: parseInt(DB_PORT, 10),
			name: DB_NAME,
			username: DB_USERNAME,
			password: DB_PASSWORD,
		},
	};
};

export const options: () => DataSourceOptions = () => {
	const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV } =
		process.env;
	return {
		type: 'mysql',
		host: DB_HOST,
		port: DB_PORT ? +DB_PORT : 3306,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME,
		// migrationsTableName: 'migrations',
		// migrations: [],
		synchronize: false,
		autoLoadEntities: NODE_ENV !== 'production',
		entities: [__dirname + '/../../**/*.entity.ts'],
		logging: NODE_ENV !== 'production',
	};
};
