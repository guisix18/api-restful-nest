import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @IsPublic()
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Res() response: Response, @Req() request: AuthRequest) {
        const token = await this.authService.login(request.user);

        return response.status(200).send(token);
    }
}
