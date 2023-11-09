import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setVersion('0.1')
    .setTitle('Vibes API')
    .setDescription(
      `
    Vibes API is a backend api for vibes mobile app.
    Vibes is a social media app that allows users to share their thoughts, photos, videos, and more with their friends and the world.
    `,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ? api docs apis goes like https://domain/api-docs
  SwaggerModule.setup('api-docs', app, document);
};
