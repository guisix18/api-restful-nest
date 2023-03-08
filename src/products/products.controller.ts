import { Body, Controller, Post, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductBodyDto } from "./dto/products.dto";
import { ProductsService } from "./products.service";
import { Response } from "express";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async createProduct(@Res() response: Response, @Body() body: ProductBodyDto) {
        const product = await this.productsService.create(body);
        return response.status(201).send(product);
    }

    @IsPublic()
    @Get()
    async listProducts(@Res() respose: Response) {
        const products = await this.productsService.list();
        return respose.status(200).send(products);
    }
}