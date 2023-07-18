import { BaseController } from 'src/common/base/base.controller';
import { Role } from '../entities/role.entity';
import { RoleService } from '../services/role.service';
import {
	Body,
	Controller,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Permissions } from '../enums/permissions.enum';

@Controller('roles')
export class RoleController extends BaseController<Role> {
	relations = [];

	constructor(public readonly service: RoleService) {
		super(service);
	}

	@HttpCode(204)
	@Post('')
	create(@Body() role: CreateRoleDto) {
		const roleEntity = new Role();
		roleEntity.name = role.name;
		roleEntity.default = !!role.default;

		const permissions = role.permissions.reduce((acc, cur) => {
			if (!Permissions[cur]) {
				throw new NotFoundException(`Permission ${cur} not found`);
			}
			acc += +Permissions[cur];
			return acc;
		}, 0);
		roleEntity.permissions = permissions;

		return this.service.create(roleEntity);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() body): Promise<Role> {
		const roleEntity = new Role();
		roleEntity.name = body.name ? body.name : roleEntity.name;
		roleEntity.default = body.default ? body.default : roleEntity.default;

		const permissions = body.permissions.reduce((acc, cur) => {
			if (!Permissions[cur]) {
				throw new NotFoundException(`Permission ${cur} not found`);
			}
			acc += +Permissions[cur];
			return acc;
		}, 0);
		roleEntity.permissions = permissions;

		return this.service.updateById(id, roleEntity);
	}
}
