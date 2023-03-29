import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { verifyIdProductMiddleware } from "src/middlewares/Product/productId.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
    imports: [PrismaModule],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(verifyIdProductMiddleware)
            .forRoutes(
                { path: 'products/:id', method: RequestMethod.GET },
                { path: 'products/:id', method: RequestMethod.PUT },
                { path: 'products/:id', method: RequestMethod.DELETE },
            )
    }
}