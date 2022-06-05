import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const mockAuthService = { isPasswordValid: jest.fn().mockReturnValue(true) };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = app.get<AuthController>(AuthController);
    service = app.get<AuthService>(AuthService);
  });

  it('should call service method correctly', async () => {
    await controller.authenticate('test');

    expect(service.isPasswordValid).toHaveBeenCalledTimes(1);
    expect(service.isPasswordValid).toBeCalledWith('test');
  });

  it('should throw if password is invalid', async () => {
    jest.spyOn(service, 'isPasswordValid').mockResolvedValue(false);

    await expect(controller.authenticate('test')).rejects.toThrow('Invalid password.');
  });
});
