import { Response } from 'express';
import { TOKEN_EXPIRES } from '../configs/constants';

export function SetCookieRFToken(response: Response, encryptId: string) {
	response.cookie('rfToken', encryptId, {
		httpOnly: true,
		secure: true,
		maxAge: TOKEN_EXPIRES.redisRefreshToken * 1000,
	});
}
