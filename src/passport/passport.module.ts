import { Module } from '@nestjs/common';
import { PassportModule as NestPassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountModule } from 'src/apis/account/account.module';
import { AccountService } from 'src/apis/account/services/account.service';

@Module({
	imports: [NestPassportModule, AccountModule],
	providers: [LocalStrategy, JwtStrategy, AccountService],
})
export class PassportModule {}
