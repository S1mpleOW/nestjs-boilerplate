import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { METADATA_KEY, STRATEGY_KEY } from '../configs/constants';
import { Permissions as PermissionTypes } from 'src/apis/account/enums/permissions.enum';
import { PermissionGuard } from '../guards/permission.guard';

export const DPermissions = (...permission: PermissionTypes[]) => {
	return applyDecorators(
		SetMetadata(METADATA_KEY.PERMISSIONS, permission),
		UseGuards(AuthGuard(STRATEGY_KEY.JWT.ADMIN)),
		UseGuards(PermissionGuard),
	);
};
