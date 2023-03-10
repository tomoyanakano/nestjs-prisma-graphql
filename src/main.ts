import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  const prismaService: PrismaService = app.get(PrismaService, {
    strict: false,
  });
  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}
bootstrap();
