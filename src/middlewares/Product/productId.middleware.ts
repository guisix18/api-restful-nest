import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class verifyIdProductMiddleware implements NestMiddleware {
    constructor(private readonly prisma: PrismaService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const findProduct = await this.prisma.products.findFirst({ where: { id } });

        if (!findProduct) {
            return res.status(400).json({ message: "Product not found" });
        }
        next();
    }
}