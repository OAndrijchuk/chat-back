import { Repository } from 'typeorm';
import { Messages } from './entities/message.entity';
export declare class MessagesService {
    private readonly messagesRepository;
    constructor(messagesRepository: Repository<Messages>);
    findAll(page?: number, limit?: number): Promise<any[]>;
}
