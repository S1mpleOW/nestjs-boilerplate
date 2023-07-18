import { PaginationDto } from '../base/base.dto';

export const PaginationToQuery = (pagination: PaginationDto) => {
	const limit = pagination.limit ? pagination.limit : '10';
	const page = pagination.page ? pagination.page : '1';
	const skip = +limit * (+page - 1);
	const take = +limit;
	return { skip, take };
};
