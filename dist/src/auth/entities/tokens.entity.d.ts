import { User } from '../../user/entities/user.entity';
export declare class Tokens {
    id: number;
    userId: User;
    refreshToken: string;
    accessToken: string;
    createdAt: Date;
    updatedAt: Date;
}
