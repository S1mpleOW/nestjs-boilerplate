import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '../../../jwt/jwt.service';
import { RedisServices } from 'src/redis/redis.service';
import { Request, Response } from 'express';
import { SetCookieRFToken } from 'src/common/helpers/setCookieRFToken';
import { CryptoService } from 'src/crypto/crypto.service';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class AccountService extends BaseService<Account> {
	constructor(
		@InjectRepository(Account)
		private accountRepo: Repository<Account>,
		private jwtService: JwtService,
		private redisService: RedisServices,
		private cryptoService: CryptoService,
	) {
		super(accountRepo);
	}

	async register(account: Account) {
		console.log('🚀 ~ AccountService ~ register ~ account:', account);
		const isExist = await this.accountRepo.findOne({
			where: { phone: account.phone },
		});

		if (isExist) {
			throw new BadRequestException('Phone number already exists');
		}

		const result = await this.accountRepo.save(account);
		return result;
	}

	async login(account: Account, response: Response) {
		const accountInDb = await this.accountRepo.findOne({
			where: { phone: account.phone },
		});

		if (!accountInDb) {
			throw new NotFoundException('Account not found');
		}

		const { id } = accountInDb;
		const payload = { id };
		// Generate accessToken
		const accessToken = await this.jwtService.signJwt(payload);
		const refreshToken = await this.jwtService.signJwt(payload, true);
		//Cache token
		this.redisService.setRefreshToken(id, refreshToken);
		this.redisService.setAccessToken(id, accessToken);
		//Encrypt cookie
		const encryptId = this.cryptoService.encryptData(id);
		SetCookieRFToken(response, encryptId);
		const result = { account, accessToken };
		return result;
	}

	changePassword(body: ChangePasswordDto, user: Account) {
		console.log(body);
		return true;
	}

	async refreshToken(req: Request) {
		const { rfToken } = req.cookies;
		const decryptId = this.cryptoService.decryptData(rfToken);
		const refreshToken = await this.redisService.getRefreshToken(decryptId);
		if (!refreshToken) {
			throw new NotFoundException('Refresh token not found');
		}

		const { id } = await this.jwtService.verifyJwt(refreshToken);

		const user = await this.accountRepo.findOne({
			where: { id },
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const payload = { id };
		const newAccessToken = await this.jwtService.signJwt(payload);
		const newRefreshToken = await this.jwtService.signJwt(payload, true);

		this.redisService.setRefreshToken(id, newRefreshToken);
		this.redisService.setAccessToken(id, newAccessToken);

		return { accessToken: newAccessToken, user };
	}
}
