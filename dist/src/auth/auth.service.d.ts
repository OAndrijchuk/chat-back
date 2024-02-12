import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IResponsToken, IResponsUser } from 'src/types/types';
import { Tokens } from 'src/auth/entities/tokens.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Response } from 'express';
export declare class AuthService {
    private readonly userRepository;
    private readonly tokensRepository;
    private readonly userService;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, tokensRepository: Repository<Tokens>, userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    validateToken(token: string): Promise<any>;
    responseTokenNormalize(tokenAll: any): Promise<IResponsToken>;
    private generateTokens;
    private saveToken;
    signUp(createUserDto: CreateUserDto): Promise<IResponsUser>;
    signIn(res: Response, userEmail: string, password: string): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            userName: any;
        };
    }>;
    logOut(refreshToken: string): Promise<{
        massage: string;
    }>;
    refresh(res: Response, refToken: string): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            userName: any;
        };
    }>;
}
