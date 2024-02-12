import { Tokens } from '../../auth/entities/tokens.entity';
export declare class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    tokenId: Tokens;
    createdAt: Date;
    updatedAt: Date;
}
