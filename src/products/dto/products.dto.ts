import { IsNotEmpty, IsNumber, IsOptional, MinLength } from "class-validator";


export class ProductBodyDto {
    @IsNotEmpty({ message: "The product name field can't be empty." })
    product_name: string;

    @IsNumber()
    price: number;

    @IsNotEmpty({ message: "Please insert a description" })
    @MinLength(10, {message: "The description has to be greater or equal than 10"})
    description: string;
}

export class ProductBodyUpdateDto {
    @IsOptional()
    @IsNotEmpty({ message: "The product name field can't be empty." })
    product_name: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNotEmpty({ message: "Please insert a description" })
    @MinLength(10, {message: "The description has to be greater or equal than 10"})
    description: string;
}