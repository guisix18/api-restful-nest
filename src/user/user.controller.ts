import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UserBodyDto, UserBodyUpdateDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async createUser(@Res() response: Response, @Body() body: UserBodyDto) {
    const user = await this.userService.create(body);
    return response.status(201).send(user);
  }

  @IsPublic()
  @Get()
  async getUser(@Res() response: Response) {
    const users = await this.userService.list();
    return response.status(200).send(users);
  }

  @Get('/:id')
  async getOneUser(@Res() response: Response, @Param('id') id: string) {
    const oneUser = await this.userService.listOne(id);
    return response.status(200).send(oneUser);
  }

  @Put('/:id')
  async updateUser(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() body: UserBodyUpdateDto,
  ) {
    const updatedUser = await this.userService.update(id, body);
    return response.status(200).send(updatedUser);
  }

  @Delete('/:id')
  async deleteUser(@Res() response: Response, @Param('id') id: string) {
    await this.userService.delete(id);
    return response.status(200).send({
      message: 'User deleted',
    });
  }
}
