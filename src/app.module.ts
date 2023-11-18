import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';
import { typeOrmConfig } from './config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    // config
    // Config Module
    // Docs -> https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeOrm Module
    // Docs -> https://docs.nestjs.com/recipes/sql-typeorm
    TypeOrmModule.forRootAsync(typeOrmConfig),

    // Rate Limiter
    // Docs -> https://docs.nestjs.com/security/rate-limiting
    ThrottlerModule.forRoot(),

    // Global modules
    HealthCheckModule,
    UsersModule,
    PostsModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
