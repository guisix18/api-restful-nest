import { Prisma } from "@prisma/client";
import { Length, IsEmail, IsUUID, IsNotEmpty} from "class-validator";

export class UserBodyDto {
    @IsUUID()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 30)
    password: string
}

export class UserReturn {
    id: string;
    name: string;
    email: string;
    password?: string;
}