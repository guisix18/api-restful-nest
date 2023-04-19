import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { ERROR_EMAIL_MIDDLEWARE } from 'src/utils/User/user.utils';

@Injectable()
export class VerifyUserEmailMiddleware implements NestMiddleware {

  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    const findUser = await this.prisma.user.findFirst({ where: { email } });

    if (findUser) {
      return res
        .status(400)
        .json({ ERROR_EMAIL_MIDDLEWARE });
    }

    next();
  }
}
