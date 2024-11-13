import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/users/user.entity';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request & { user?: User }, res: Response, next: NextFunction) {
    next();
  }
}
