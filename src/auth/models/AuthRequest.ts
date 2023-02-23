import { Request } from "express";
import { User } from "src/user/entities/user.entities";

export interface AuthRequest extends Request {
    user: User
}