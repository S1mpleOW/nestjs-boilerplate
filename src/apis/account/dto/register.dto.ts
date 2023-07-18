import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class RegisterDto {
	@IsString()
	@IsNotEmpty()
	phone: string;

	@IsString()
	@MinLength(4)
	@MaxLength(20)
	@IsNotEmpty()
	password: string;

	@IsString()
	@MinLength(4)
	@MaxLength(20)
	@IsNotEmpty()
	@Match('password')
	confirmPassword: string;
}
