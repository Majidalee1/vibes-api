import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './config';
import { GlobalExceptionFilter } from './common/filters/globalException';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove the field that are not in Dto
      forbidNonWhitelisted: true, // throw an error is field does not exits in dto
    }),
  );
  // ******************* Settings *********************

  // ? app port
  const backupPort = 8000;
  const appPort = process.env.PORT || backupPort;

  // ? enable cors
  app.enableCors();

  app.useGlobalFilters(new GlobalExceptionFilter());

  // ? global api perfix
  app.setGlobalPrefix('api');

  // ? Swagger For Apis Docs
  swaggerConfig(app);

  await app.listen(appPort, () => {
    console.log(`You Applications is live on 👉 Port:${appPort}`);
  });
}
bootstrap();
