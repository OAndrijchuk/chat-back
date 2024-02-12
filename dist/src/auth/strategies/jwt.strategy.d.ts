import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate(user: IUser): Promise<any>;
}
export {};
