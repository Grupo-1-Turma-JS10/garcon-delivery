import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import{DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

   const config = new DocumentBuilder()
  .setTitle('API Garcon-Delivery')
  .setDescription('Documentação API')
  .setContact("Grupo1-JS10","https://github.com/Grupo-1-Turma-JS10/garcon-delivery.git","generation@email.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

}
bootstrap();
