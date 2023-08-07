import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { EError } from '@src/constants/error-code.constant';

export function httpBadRequest(message?: string, code?: string) {
  throw new BadRequestException({
    statusCode: 400,
    errorCode: code || EError.E_100,
    message,
  });
}

export function httpNotFound(message?: string) {
  throw new NotFoundException(message);
}

export function httpUnauthorized(message?: string) {
  throw new UnauthorizedException(message);
}

export function httpForbidden(message?: string) {
  throw new ForbiddenException(message);
}

export function httpServiceUnavailable(message?: string) {
  throw new ServiceUnavailableException(message);
}
