// create a decorator that fetch the user from jwt token
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/entities/users.entity';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
