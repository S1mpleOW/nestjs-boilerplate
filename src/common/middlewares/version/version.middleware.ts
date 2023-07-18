import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NestMiddleware,
} from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class VersionMiddleware implements NestMiddleware {
	private logger = new Logger(VersionMiddleware.name);

	use(req: Request, res: Response, next: NextFunction) {
		const currentVersion: string | undefined = process.env.APPLICATION_VERSION;
		this.logger.log(`Current Version: ${currentVersion}`);
		if (!currentVersion) {
			throw new InternalServerErrorException(
				'Please provide a valid version in the configuration',
			);
		}

		const appVersion = req.headers['x-app-version'];
		if (!appVersion || appVersion !== currentVersion)
			throw new BadRequestException('Invalid App Version');
		next();
	}
}
