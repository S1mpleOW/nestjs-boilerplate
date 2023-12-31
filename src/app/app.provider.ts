import { BadRequestException, Provider, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

const exceptionFactory = (errors: ValidationError[]) => {
	throw new BadRequestException(
		errors.reduce((prev, next) => {
			const err = validationErrors(next);

			return {
				...prev,
				...err,
			};
		}, {}),
	);
};

const validationErrors = (err: ValidationError) => {
	if (!err.constraints && err.children && err.children.length > 0) {
		return validationErrors(err.children[0]);
	}

	return {
		[err.property]: err.constraints ? Object.values(err.constraints)[0] : '',
	};
};

export const providers: Provider[] = [
	{
		provide: APP_FILTER,
		useClass: HttpExceptionFilter,
	},
	{
		provide: APP_PIPE,
		useValue: new ValidationPipe({
			exceptionFactory,
		}),
	},
];
