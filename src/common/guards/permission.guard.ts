import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Account } from 'src/apis/account/entities/account.entity';
import { METADATA_KEY } from '../configs/constants';
import { Permissions } from 'src/apis/account/enums/permissions.enum';
import { AccountService } from 'src/apis/account/services/account.service';

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly accountSrv: AccountService,
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredPermissions = this.reflector.getAllAndMerge<string[]>(
			METADATA_KEY.PERMISSIONS,
			[context.getHandler(), context.getClass()],
		) as unknown as Permissions[];
		if (!requiredPermissions || requiredPermissions.length === 0) {
			return true;
		}
		const request = context.switchToHttp().getRequest<Request>();
		const { id } = request.user as Account;
		if (!id) {
			throw new UnauthorizedException('Not have permissions to do it');
		}
		const account = await this.accountSrv.repo.findOne({
			relations: ['role'],
			where: { id },
		});

		if (!account) {
			throw new UnauthorizedException('Not have permissions to do it');
		}
		const { role } = account;

		const { permissions } = role;

		if (!permissions) {
			throw new UnauthorizedException('Not have permissions to do it');
		}

		const hasPermission = requiredPermissions.every((item) => {
			return account.can(item);
		});

		if (!hasPermission) {
			throw new ForbiddenException('Not have enough permissions to do it');
		}
		return hasPermission;
	}
}
