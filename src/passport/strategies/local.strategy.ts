import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AccountService } from 'src/apis/account/services/account.service';
import { STRATEGY_KEY } from 'src/common/configs/constants';
import { comparePassword } from 'src/common/helpers/bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(
	Strategy,
	STRATEGY_KEY.LOCAL.ADMIN,
) {
	constructor(private readonly authService: AccountService) {
		super({
			usernameField: 'phone',
			passwordField: 'password',
		});
	}

	async validate(phone: string, password: string) {
		const where = { phone };
		const admin = await this.authService.getOneOrFail(where);
		const isMatch = await comparePassword(password, admin.password);
		if (!isMatch) {
			throw new UnauthorizedException('Invalid password');
		}
		return admin;
	}
}
