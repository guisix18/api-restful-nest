import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { User } from 'src/user/entities/user.entities';
import { UserService } from 'src/user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        };

        const jwtToken = this.jwtService.sign(payload)

        return {
            acess_token: jwtToken
        };

    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (user) {
            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                }
            }
        }
        throw new Error("Email or Password provided is incorrect.");
    }
}

