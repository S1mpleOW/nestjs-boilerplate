import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { FindOptionsOrder } from 'typeorm';

export abstract class BaseController<Entity extends BaseEntity> {
	abstract relations: string[];

	constructor(public readonly service: BaseService<Entity>) {}

	@Post('')
	create(@Body() body): Promise<Entity> {
		return this.service.create(body);
	}

	@Get('')
	getAll(@Query() query: PaginationDto): Promise<[Entity[], number]> {
		return this.service.getAllWithPagination(
			query,
			{},
			{ createdAt: 'DESC' } as FindOptionsOrder<Entity>,
			...this.relations,
		);
	}

	@Get(':id')
	getDetail(@Param('id') id: string): Promise<Entity> {
		return this.service.getOneByIdOrFail(id, ...this.relations);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() body): Promise<Entity> {
		return this.service.updateById(id, body);
	}

	@Delete(':id')
	delete(@Param('id') id: string): Promise<Entity> {
		return this.service.softDeleteById(id);
	}

	setRelations(relations: string[]) {
		this.relations = relations;
	}
}
