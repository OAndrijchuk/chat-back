import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer();
const ioServer = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

ioServer.on('connection', (socket) => {
  socket.on('chat-message', (data) => {
    console.log(data);
    socket.broadcast.emit('chat-message', data);
  });
});

httpServer.listen(5000);

// ==============================================================================================================
// ==============================================================================================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
