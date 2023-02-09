import { Injectable } from "@nestjs/common";
import { UserBodyDto, UserReturn } from "./dto/user.dto";
import { prisma } from "prisma/client/client";
import { randomUUID } from "crypto";

@Injectable()
export class UserService {

    async create(dto: UserBodyDto): Promise<UserReturn> {
        const createUser = await prisma.user.create({
            data: {
                id: randomUUID(),
                name: dto.name,
                email: dto.email,
                password: dto.password
            }, select: { id: true, name: true, email: true }
        })

        return createUser;
    }

    async list(): Promise<UserReturn[]> {
        return await prisma.user.findMany({ select: { id: true, name: true, email: true } })
    }

    async listOne(id: string): Promise<UserReturn> {
        return await prisma.user.findFirst({ where: { id }, select: { id: true, name: true, email: true } });
    }

}