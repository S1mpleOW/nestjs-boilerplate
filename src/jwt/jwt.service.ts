import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt.interface';

@Injectable()
export class JwtService extends NestJwtService {
	async signJwt(payload: IJwtPayload, isRefreshToken = false) {
		const expiresIn = isRefreshToken ? '30d' : '15d';
		const token = await this.signAsync(payload, {
			expiresIn,
			secret: process.env.SECRET_JWT,
		});

		return token;
	}

	async verifyJwt(token: string) {
		try {
			const payload = await this.verifyAsync<IJwtPayload>(token, {
				secret: process.env.SECRET_JWT,
			});

			return payload;
		} catch (error) {
			throw new UnauthorizedException();
		}
	}
}
