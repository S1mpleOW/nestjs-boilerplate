install redis:
	@echo "Installing redis cache manager"
	@npm install --save cache-manager cache-manager-redis-store @nestjs/cache-manager
	@echo "Installing redis cache manager types"
	@npm install --save-dev @types/cache-manager @types/cache-manager-redis-store
	@echo "Redis installed"
