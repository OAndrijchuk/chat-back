import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Tokens } from 'src/auth/entities/tokens.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly tokensRepository;
    constructor(userRepository: Repository<User>, tokensRepository: Repository<Tokens>);
    private checkEmail;
    private checkUserExist;
    responseUserNormalize(res: any): Promise<{
        id: any;
        email: any;
        userName: any;
    }>;
    findAll(page?: number, limit?: number): Promise<any[]>;
    create(createUserDto: CreateUserDto): Promise<{
        password: any;
        token: string;
        email: string;
        userName: string;
    } & User>;
    findOneByID(id: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: any;
        email: any;
        userName: any;
    }>;
    remove(id: number): Promise<{
        id: any;
        email: any;
        userName: any;
    }>;
}
