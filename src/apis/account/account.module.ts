import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Account } from './entities/account.entity';
import { AccountService } from './services/account.service';

@Module({
	imports: [TypeOrmModule.forFeature([Account, Role])],
	providers: [RoleService, AccountService],
	controllers: [AccountController, RoleController],
	exports: [TypeOrmModule],
})
export class AccountModule {}
