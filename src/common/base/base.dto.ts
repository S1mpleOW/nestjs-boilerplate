import { IsArray, IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
	@IsOptional()
	@IsNumberString()
	page?: number | string;

	@IsOptional()
	@IsNumberString()
	limit?: number | string;
}

export class QueryDto extends PaginationDto {
	@IsOptional()
	@IsArray()
	orderBy?: string[];

	@IsOptional()
	@IsArray()
	select?: string[];
}
