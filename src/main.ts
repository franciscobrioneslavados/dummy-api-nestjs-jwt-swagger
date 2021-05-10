import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as logger from 'morgan';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger('dev'));

  const options = new DocumentBuilder()
    .setTitle('Dummy')
    .setDescription('Dummy API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt-auth',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(AppModule.port);
}
bootstrap();
