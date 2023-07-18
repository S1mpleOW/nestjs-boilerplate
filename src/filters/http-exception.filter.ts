import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const statusCode = exception.getStatus();
		const errors = exception.getResponse();
		const exceptionName = exception.name;
		const path = request.url;
		const timestamp = new Date().toISOString();

		const isDev = process.env.NODE_ENV === 'local';
		const responseException = {
			statusCode,
			path,
			timestamp,
			name: exceptionName,
			errors: isDev ? errors : undefined,
		};
		if (isDev) {
			console.log(exception);
		}

		return response.status(statusCode).json(responseException);
	}
}
