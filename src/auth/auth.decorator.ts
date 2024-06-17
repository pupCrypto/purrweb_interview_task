import {
  createParamDecorator,
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import AuthService from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    if (bearerToken === undefined) {
      throw new HttpException(
        'You must provide Authorization header',
        HttpStatus.BAD_REQUEST,
      );
    }
    const auth = await this.authService.authenticate(bearerToken);
    request.auth = auth;
    return !!auth;
  }
}

export const AuthParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.auth;
  },
);
