import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TryCatchWrapper } from 'src/decorators/error-cach.decorator';
import { paginate } from 'src/utils/pagination.util';
import { Injectable } from '@nestjs/common';
import { Messages } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
  ) {}

  @TryCatchWrapper()
  async findAll(page: number = 1, limit: number = 20) {
    const messages = await this.messagesRepository.find({
      relations: ['userId'],
    });

    const paginatedMessages = paginate(
      messages.map((el) => ({
        ...el,
        userId: el.userId.id,
        login: el.userId.userName,
      })),
      { page, limit },
    );

    return await Promise.all(paginatedMessages);
  }
}
