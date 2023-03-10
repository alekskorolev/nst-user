import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /* logIn<TRequest extends { logIn: Function; } = any>(request: TRequest): Promise<void> {
    console.log(request)
    return super.logIn(request)
  }
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    console.log(err, user, info, context, status)
    return super.handleRequest(err, user, info, context, status)
  }*/
}
