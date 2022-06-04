import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AUTH_TOKEN } from '../../constants/auth.constants';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async authenticate(@Body('password') password: string): Promise<{ token: string }> {
    const isPasswordValid = await this.authService.isPasswordValid(password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password.');
    }

    return { token: AUTH_TOKEN };
  }
}
