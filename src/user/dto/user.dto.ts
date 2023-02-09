import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserBodyDto {
    @IsNotEmpty({ message: "The name field can't be empty." })
    name: string;

    @IsEmail(undefined, { message: 'Email is not valid' })
    email: string;

    @IsNotEmpty()
    @MinLength(8, { message: 'The password has to be greater or equal than 8' })
    password: string
}

export class UserReturn {
    id: string;
    name: string;
    email: string;
    password?: string;
}