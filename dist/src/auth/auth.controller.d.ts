import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IResponsUser } from 'src/types/types';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    signUp(createUserDto: CreateUserDto): Promise<IResponsUser>;
    signIn(res: Response, { email, password }: {
        email: any;
        password: any;
    }): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            userName: any;
        };
    }>;
    logOut(req: Request, res: Response): Promise<{
        massage: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            userName: any;
        };
    }>;
}
