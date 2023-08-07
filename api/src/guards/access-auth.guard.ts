import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AccessAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    /**
     * @TODO handle auth
     */
    return true;
  }
}
