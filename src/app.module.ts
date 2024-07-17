import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatterInterceptor } from './utils/interceptors/response.interceptor';
import { HttpExceptionFilter } from './utils/filters/exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModule } from './modules/LLM/event/event.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { CreatorModule } from './modules/HLM/creator/creator.module';
import { AuthModule } from './modules/MLM/auth/auth.module';
import { StreamModule } from './modules/mlm/stream/stream.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://themesyed:v5MvYW6p2ixUPMIq@cluster0.mlh3pmy.mongodb.net/1', {}),
    AuthModule,
    EventModule,
    CreatorModule,
    StreamModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatterInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

