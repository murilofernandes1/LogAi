import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/type.decorator.js';
import { User } from '../../modules/user/domain/user.entity.js';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.getAllAndOverride<
      ['DRIVER' | 'ADMIN']
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    return user && requiredTypes.includes(user.role);
  }
}
