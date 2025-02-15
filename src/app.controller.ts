import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PresignedUrlDtoResult } from './presigned-url-result.dto';

@Controller('s3')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('presigned-url/')
  async getPresignedUrl(
    @Query('filename') query: string,
  ): Promise<PresignedUrlDtoResult> {
    console.log(query);
    const url = await this.appService.getPresignedUrl(query);
    return { url };
  }
}
