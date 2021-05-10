import { createParamDecorator, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export const AuthUser = createParamDecorator((data, req) => {
  return req.user;
});
