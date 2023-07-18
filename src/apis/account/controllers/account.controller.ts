import {
	Body,
	Controller,
	HttpCode,
	Patch,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { LoginDto } from '../dto/login.dto';
import { Account } from '../entities/account.entity';
import { DPermissions } from 'src/common/decorators/permission.decorator';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { User } from 'src/common/decorators/user.decorator';
import { Permissions } from '../enums/permissions.enum';
import { RegisterDto } from '../dto/register.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY_KEY } from 'src/common/configs/constants';

@Controller('auth')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@HttpCode(200)
	@Post('register')
	async register(@Body() body: RegisterDto) {
		const { phone, password } = body;
		const account = new Account();
		account.phone = phone;
		account.password = password;
		return this.accountService.register(account);
	}

	@HttpCode(200)
	@Post('login')
	@UseGuards(AuthGuard(STRATEGY_KEY.LOCAL.ADMIN))
	async login(
		@Body() body: LoginDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const { phone, password } = body;
		const account = new Account();
		account.phone = phone;
		account.password = password;
		return this.accountService.login(account, response);
	}

	@Patch('change-password')
	@HttpCode(200)
	@DPermissions(Permissions.READ)
	async changePassword(@Body() body: ChangePasswordDto, @User() user: Account) {
		return this.accountService.changePassword(body, user);
	}

	@Post('refresh-token')
	@HttpCode(200)
	async refreshToken(@Req() req: Request) {
		return this.accountService.refreshToken(req);
	}
}
