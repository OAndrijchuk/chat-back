import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { Messages } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  providers: [MyGateway, MessagesService],
  imports: [TypeOrmModule.forFeature([Messages])],
  controllers: [MessagesController],
})
export class GatewayModule {}
