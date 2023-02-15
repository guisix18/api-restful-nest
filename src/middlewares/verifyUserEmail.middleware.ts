import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { prisma } from "prisma/client/client";

@Injectable()
export class VerifyUserEmailMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const {email} = req.body;

        const findUser = await prisma.user.findFirst({where: {email}});


        if(findUser) {
            return res.status(400).json({ message: "This email is already being used" })
        }

        next();

    }
}