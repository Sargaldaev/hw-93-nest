import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PermitGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && user.role === 'admin';
  }
}
