import {
  createParamDecorator,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import AuthService from './auth.service';
import { BearerTokenNotProvided } from 'src/errors';
import { isNull } from 'src/utils/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken: string = request.headers.authorization;
    console.log(bearerToken);
    if (isNull(bearerToken)) {
      throw new BearerTokenNotProvided();
    }
    const clearToken = bearerToken.replace('Bearer ', '');
    const auth = await this.authService.authenticate(clearToken);
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
