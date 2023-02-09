import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserBodyDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@ApiTags('User')
@Controller('/user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() body: UserBodyDto) {
        const user = await this.userService.create(body)
        return user;
    }

    @Get()
    async getUser() {
        return await this.userService.list();
    }

    @Get('/:id')
    async getOneUser(@Param('id') id: string) {
        return await this.userService.listOne(id);
    }
}