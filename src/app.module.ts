import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlPresignedUseCases } from './url-presigned.usecase';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UrlPresignedUseCases],
})
export class AppModule {}
