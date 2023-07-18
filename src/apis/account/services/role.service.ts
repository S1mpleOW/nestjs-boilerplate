import { BaseService } from 'src/common/base/base.service';
import { Role } from '../entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends BaseService<Role> {
	constructor(
		@InjectRepository(Role)
		private roleRepo: Repository<Role>,
	) {
		super(roleRepo);
	}

	hasPermission(role: Role, permission: number) {
		const { permissions } = role;
		if (!permissions) {
			return false;
		}
		return (role.permissions & permission) === permission;
	}

	async resetPermission(role: Role) {
		role.permissions = 0;
		await this.roleRepo.save(role);
	}
}
