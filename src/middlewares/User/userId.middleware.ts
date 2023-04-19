import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { ERROR_USER_ID_NOT_FOUND_MIDDLEWARE } from 'src/utils/User/user.utils';

@Injectable()
export class VerifyIdMiddleware implements NestMiddleware {

  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const findUser = await this.prisma.user.findFirst({ where: { id } });

    if (!findUser) {
      return res.status(400).json({ ERROR_USER_ID_NOT_FOUND_MIDDLEWARE });
    }

    next();
  }
}
