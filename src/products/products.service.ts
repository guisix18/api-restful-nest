import { Injectable } from "@nestjs/common";
import { Prisma, Products } from "@prisma/client";
import { randomUUID } from "crypto";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductBodyDto } from "./dto/products.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: ProductBodyDto): Promise<Products> {
        const data: Prisma.ProductsCreateInput = {
            id: randomUUID(),
            ...dto
        }

        const createProduct = await this.prisma.products.create({ data })

        return createProduct;
    }

    async list(): Promise<Products[]> {
        const products = await this.prisma.products.findMany()

        return products;
    }

    async listOne(id: string): Promise<Products> {
        const oneProduct = await this.prisma.products.findFirstOrThrow({
            where: { id }
        })

        return oneProduct
    }
}