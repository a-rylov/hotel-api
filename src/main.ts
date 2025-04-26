import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedRooms } from './rooms/seed';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Hotel API')
    .setDescription('API для работы с отелем')
    .setVersion('0.1')
    .addTag('Rooms')
    .addTag('Bookings')
    .addTag('Auth')
    .addTag('Admin')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const dataSource = app.get(DataSource);
  await seedRooms(dataSource);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  await app.listen(3000);


}
bootstrap();
