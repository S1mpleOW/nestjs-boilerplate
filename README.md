# The boilerplate for nestjs application

- Auth api:
  - With 3 main roles: administrator, moderator, user
  - Has 4 permissions: read, write, moderate, admin
  - Has 3 main entities: user, role
  - Using power of two to define permission
  - Using jwt to authenticate
  - Using passport to authorize
  - Using bcrypt to hash password
  - Using class-validator to validate data
  - Using class-transformer to transform data
  - Using nestjs/swagger to generate swagger api
