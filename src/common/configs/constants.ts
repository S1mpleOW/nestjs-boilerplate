export const STRATEGY_KEY = {
	LOCAL: {
		ADMIN: 'local_admin',
	},
	JWT: {
		ADMIN: 'jwt_admin',
	},
};

export const METADATA_KEY = {
	REDIS: 'redis',
	ROLES: 'roles',
	PERMISSIONS: 'permissions',
};

export const TOKEN_EXPIRES = {
	accessToken: '15d',
	refreshToken: '30d',
	redisAccessToken: 60 * 60 * 24 * 15,
	redisRefreshToken: 60 * 60 * 24 * 30,
};
