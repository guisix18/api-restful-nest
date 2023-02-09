import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { prisma } from "prisma/client/client";

@Injectable()
export class VerifyIdMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const findUser = await prisma.user.findFirst({where: {id}});


        if(!findUser) {
            return res.status(400).json({ message: "User not found" })
        }

        next();

    }
}