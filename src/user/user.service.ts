import { Injectable } from '@nestjs/common';
import { UserBodyDto, UserBodyUpdateDto } from './dto/user.dto';
import { User } from './entities/user.entities';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserList } from './entities/user.entities';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: UserBodyDto): Promise<User> {
        const data: Prisma.UserCreateInput = {
            id: randomUUID(),
            ...dto,
            password: await bcrypt.hash(dto.password, 8)
        }

        const createUser = await this.prisma.user.create({ data });

        return {
            ...createUser,
            password: undefined
        };
    }

    async list(): Promise<UserList[]> {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
        });
    }

    async listOne(id: string): Promise<Partial<User>> {
        return await this.prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true
            },
        });
    }

    async update(id: string, body: UserBodyUpdateDto): Promise<Partial<User>> {
        const findUser = await this.prisma.user.findFirst({
            where: {
                id
            },
        });

        const userUpdated = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                name: body.name ? body.name : findUser.name,
                email: body.email ? body.email : findUser.email,
                password: body.password ? body.password : findUser.password,
            }
        });
        return {
            ...userUpdated,
            password: undefined
        };
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id
            },
        });
        return;
    }

    async findByEmail(email: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }
}
