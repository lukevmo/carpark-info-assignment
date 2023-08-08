import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { EGuardDecoratorKey } from '@src/constants/constant';
import { TokenService } from '@src/modules/token/token.service';
import { httpUnauthorized } from '@src/share/http-exception';
import { EEnvType } from '@src/constants/env.type';

@Injectable()
export class AccessAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(EGuardDecoratorKey.IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      httpUnauthorized();
    }

    try {
      const payload = await this.tokenService.verifyJwt(token, {
        secret: this.configService.get<string>(EEnvType.JWT_SECRET_KEY),
      });
      request['user'] = payload;
    } catch {
      httpUnauthorized();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
