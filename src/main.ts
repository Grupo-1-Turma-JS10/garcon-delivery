import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

const TIMEZONE: string = '-03:00';
const ENABLECORS: boolean = true;

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  swaggerSetup(app);

  process.env.TZ = TIMEZONE;

  if (ENABLECORS) {
    app.enableCors();
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

function swaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('API Garçon-Delivery')
    .setDescription('Documentação API')
    .setContact(
      "Grupo1-JS10", 
      "https://github.com/Grupo-1-Turma-JS10/garcon-delivery.git", 
      "generation@email.com"
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
}