import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountService } from 'src/apis/account/services/account.service';
import { STRATEGY_KEY } from 'src/common/configs/constants';
import { IJwtPayload } from 'src/jwt/jwt.interface';
import { RedisServices } from 'src/redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
	Strategy,
	STRATEGY_KEY.JWT.ADMIN,
) {
	constructor(
		private readonly authService: AccountService,
		private readonly redisService: RedisServices,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_JWT,
		});
	}

	async validate(payload: IJwtPayload) {
		const { id } = payload;
		const where = { id };
		await this.redisService.getAccessToken(id);
		return this.authService.getOneOrFail(where);
	}
}
