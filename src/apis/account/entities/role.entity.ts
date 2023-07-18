import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
	@Column({
		unique: true,
	})
	@IsNotEmpty()
	name: string;

	@Column({
		default: false,
	})
	@Index()
	default: boolean;

	@Column()
	permissions: number;

	hasPermission(permission: number): boolean {
		return (this.permissions & permission) === permission;
	}
}
