import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { Messages } from './entities/message.entity';
import { Repository } from 'typeorm';
export declare class MyGateway implements OnModuleInit {
    private readonly messagesRepository;
    constructor(messagesRepository: Repository<Messages>);
    server: Server;
    onModuleInit(): void;
}
