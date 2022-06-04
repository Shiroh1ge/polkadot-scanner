import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.controller';

describe('AuthController', () => {
  let appController: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthService],
      providers: [],
    }).compile();

    appController = app.get<AuthService>(AuthService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(true).toBe('true');
    });
  });
});
