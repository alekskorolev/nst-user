import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { logger } from './shared/log.middleware';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  // app.use(logger)

  
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://0.0.0.0:5672'],
      queue: 'user.auth',
      noAck: false,
      queueOptions: {
        durable: true
      }
    }
  })
  app.startAllMicroservices();
  app.enableCors();
  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
