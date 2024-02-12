import { User } from '../../user/entities/user.entity';
export declare class Messages {
    id: number;
    messageId: string;
    userId: User;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
