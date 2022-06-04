import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AUTH_TOKEN } from '../constants/auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private validate(token: string) {
    // usually you would create and validate the token here with a real authentication service
    // we use a hardcoded token here for the purpose of the example
    return token === AUTH_TOKEN;
  }

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authToken: string = request.query.token as string;

    return this.validate(authToken);
  }
}
