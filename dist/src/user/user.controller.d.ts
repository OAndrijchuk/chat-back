import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IResponsUser } from 'src/types/types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        password: any;
        token: string;
        email: string;
        userName: string;
    } & import("./entities/user.entity").User>;
    findAll(page?: number, limit?: number): Promise<any[]>;
    findOne(id: string): Promise<IResponsUser>;
    update(updateUserDto: UpdateUserDto, req: any): Promise<{
        id: any;
        email: any;
        userName: any;
    }>;
    remove(req: any): Promise<IResponsUser>;
}
