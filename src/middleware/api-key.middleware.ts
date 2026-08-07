import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { request } from 'http';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header['x-api-key'];

    if (apiKey !== 'secret-key-abc'){
      throw new UnauthorizedException('Invalid api key');
    }

    next();
  }
}
