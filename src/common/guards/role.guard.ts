import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Account } from 'src/apis/account/entities/account.entity';
import { METADATA_KEY } from '../configs/constants';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(
			METADATA_KEY.ROLES,
			[context.getHandler(), context.getClass()],
		);
		if (!requiredRoles || requiredRoles.length === 0) {
			return true;
		}
		const request = context.switchToHttp().getRequest<Request>();
		const account = request.user as Account;
		const { role } = account;
		if (!role || !role.name) {
			throw new ForbiddenException(
				'You do not have permission to access this resource',
			);
		}
		if (!requiredRoles.includes(role.name)) {
			throw new ForbiddenException('Permission denied');
		}
		return true;
	}
}
