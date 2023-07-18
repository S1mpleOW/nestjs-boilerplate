import * as bcrypt from 'bcrypt';

export function hashPassword(rawPassword: string): Promise<string> {
	const SALT = bcrypt.genSaltSync();
	return bcrypt.hash(rawPassword, SALT);
}

export function comparePassword(
	rawPassword: string,
	hashPassword: string,
): Promise<boolean> {
	return bcrypt.compare(rawPassword, hashPassword);
}
