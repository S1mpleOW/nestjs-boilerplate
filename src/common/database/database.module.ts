import { Module } from '@nestjs/common';
import { options } from '../configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: () => options(),
		}),
	],
})
export class DatabaseModule {}
