import { Body, Controller, Post, Get, Put, Res, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductBodyDto, ProductBodyUpdateDto } from "./dto/products.dto";
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

    @Put('/:id')
    async updateProduct(@Res() response: Response, @Param('id') id: string, @Body() body: ProductBodyUpdateDto) {
        const updatedProduct = await this.productsService.update(id, body);
        return response.status(200).send(updatedProduct)
    }

    @Delete('/:id')
    async deleteProduct(@Res() response: Response, @Param('id') id: string) {
        await this.productsService.delete(id);
        return response.status(202).send({
            message: "Product deleted"
        })
    }
}