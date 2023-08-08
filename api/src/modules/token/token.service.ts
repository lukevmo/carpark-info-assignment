import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  signJwt(payload: Record<string, any>, jwtSignOptions?: JwtSignOptions) {
    return this.jwtService.sign(payload, jwtSignOptions);
  }

  verifyJwt(token: string, jwtVerifyOptions?: JwtVerifyOptions) {
    return this.jwtService.verify(token, jwtVerifyOptions);
  }
}
