import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(email: string): Promise<any>;
}
export {};
