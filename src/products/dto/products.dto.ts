import { IsNotEmpty, IsNumber, MinLength } from "class-validator";


export class ProductBodyDto {
    @IsNotEmpty({ message: "The product name field can't be empty." })
    product_name: string;

    @IsNumber()
    price: number;

    @IsNotEmpty({ message: "Please insert a description" })
    @MinLength(10, {message: "The description has to be greater or equal than 10"})
    description: string;
}