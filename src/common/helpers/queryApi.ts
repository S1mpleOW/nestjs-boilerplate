// import { FindOptionsOrder, Repository, SelectQueryBuilder } from 'typeorm';
// import { BaseEntity } from '../base/base.entity';
// import { QueryDto } from '../base/base.dto';
// import { TFindWhereOptions } from '../types/findWhereOption.type';

// class QueryApi<Entity extends BaseEntity> {
// 	constructor(
// 		private readonly repo: Repository<Entity>,
// 		private query: SelectQueryBuilder<Entity>,
// 	) {}

// 	addWhere<Entity extends BaseEntity>(
// 		queryBuilder: SelectQueryBuilder<Entity>,
// 		where?: TFindWhereOptions<Entity>,
// 	) {
// 		const keys = Object.keys(where);
// 		if (keys.length < 0) return;
// 		keys.forEach((key, index) => {
// 			const value = where[key];
// 			let queryString = `entity.${value} = ${where[value]}`;
// 			if (typeof where[value] === 'string') {
// 				queryString = `entity.${value} = '${where[value]}'`;
// 			}
// 			let whereMethod = 'andWhere';
// 			if (index === 0) {
// 				whereMethod = 'where';
// 			}
// 			queryBuilder[whereMethod](queryString);
// 		});
// 		return queryBuilder;
// 	}

// 	addQuery<Entity extends BaseEntity>(
// 		queryBuilder: SelectQueryBuilder<Entity>,
// 		query?: Partial<QueryDto>,
// 		where?: TFindWhereOptions<Entity>,
// 	) {
// 		if (!query) return;

// 		const queryKeys = Object.keys(query);
// 		const whereKeys = Object.keys(where);
// 		if (queryKeys.length < 0) return;
// 		queryKeys.forEach((key) => {
// 			const value = query[key];
// 			const queryObjects = key.split('.');
// 			let queryString = `entity.${key} LIKE '%${value}%'`;
// 			if (typeof query[value] === 'string') {
// 				queryString = `entity.${value} = '${query[value]}'`;
// 			}
// 			if (queryObjects.length > 1) {
// 				queryString = `${key} LIKE '%${value}%'`;
// 			}
// 			let whereMethod = 'andWhere';
// 			if (whereKeys.length === 0) {
// 				whereMethod = 'where';
// 			}
// 			queryBuilder[whereMethod](queryString);
// 		});
// 		return queryBuilder;
// 	}
// }
