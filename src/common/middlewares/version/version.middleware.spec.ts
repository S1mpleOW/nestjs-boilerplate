import { VersionMiddleware } from './version.middleware';

describe('VersionMiddleware', () => {
  it('should be defined', () => {
    expect(new VersionMiddleware()).toBeDefined();
  });
});
