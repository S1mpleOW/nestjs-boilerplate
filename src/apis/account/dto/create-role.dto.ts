import { IsArray, IsBoolean, IsString } from 'class-validator';
import { Permissions } from '../enums/permissions.enum';

export class CreateRoleDto {
	@IsString()
	name: string;

	@IsBoolean()
	default?: boolean;

	@IsArray()
	permissions: Permissions[];
}
