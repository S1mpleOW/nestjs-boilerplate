import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Role } from './role.entity';
import { hashPassword } from 'src/common/helpers/bcrypt';
import { Permissions } from '../enums/permissions.enum';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_KEY } from 'src/common/configs/constants';
import { IsNotEmpty } from 'class-validator';

@Entity('accounts')
@UseGuards(AuthGuard(STRATEGY_KEY.LOCAL.ADMIN))
export class Account extends BaseEntity {
	@Column({
		unique: true,
	})
	@IsNotEmpty()
	phone: string;

	@Column()
	@Exclude()
	@IsNotEmpty()
	password!: string;

	@OneToOne(() => Role)
	@JoinColumn({
		name: 'role_id',
	})
	role: Role;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await hashPassword(this.password);
		if (!this.role) {
			this.role = await Role.findOne({ where: { default: true } });
		}
	}

	can(permission: number | Permissions): boolean {
		return this?.role && this.role.hasPermission(permission);
	}
}
