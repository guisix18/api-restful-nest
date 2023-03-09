import { Body, Controller, Post, Get, Res, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductBodyDto } from "./dto/products.dto";
import { ProductsService } from "./products.service";
import { response, Response } from "express";
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

    @IsPublic()
    @Get('/:id')
    async listOneProduct(@Res() response: Response, @Param('id') id: string) {
        const oneProduct = await this.productsService.listOne(id);
        return response.status(200).send(oneProduct)
    }
}